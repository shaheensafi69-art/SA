"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Plus, Loader2 } from "lucide-react";
import CreateStoryModal from "./CreateStoryModal";
import StoryViewerModal, { StoryRecord } from "./StoryViewerModal";

interface StoryGroup {
  userId: string;
  userName: string;
  avatarUrl: string;
  stories: StoryRecord[];
  hasUnseen: boolean;
}

interface StoryBarProps {
  currentUserId: string | null;
}

export default function StoryBar({ currentUserId }: StoryBarProps) {
  const [storyGroups, setStoryGroups] = useState<StoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeViewerGroup, setActiveViewerGroup] = useState<StoryGroup | null>(null);
  const [currentUserProfile, setCurrentUserProfile] = useState<{
    first_name: string;
    avatar_url: string;
  } | null>(null);

  const supabase = createClient();

  const fetchStories = async () => {
    try {
      setLoading(true);
      const nowIso = new Date().toISOString();

      // Fetch active stories
      const { data: storiesData, error } = await supabase
        .from("user_stories")
        .select(`
          id,
          user_id,
          media_url,
          media_type,
          caption,
          duration_seconds,
          created_at,
          expires_at
        `)
        .gt("expires_at", nowIso)
        .order("created_at", { ascending: true });

      if (error) throw error;

      if (!storiesData || storiesData.length === 0) {
        setStoryGroups([]);
        return;
      }

      // Fetch profiles for users with active stories
      const userIds = Array.from(new Set(storiesData.map((s) => s.user_id)));
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, avatar_url")
        .in("id", userIds);

      const profileMap = new Map(
        (profilesData || []).map((p) => [
          p.id,
          {
            first_name: p.first_name || "",
            last_name: p.last_name || "",
            avatar_url: p.avatar_url || "/placeholder-avatar.png",
          },
        ])
      );

      // Group stories by user_id
      const groupsMap = new Map<string, StoryRecord[]>();
      storiesData.forEach((s) => {
        const fullStoryRecord: StoryRecord = {
          ...s,
          user_profile: profileMap.get(s.user_id),
        };

        if (!groupsMap.has(s.user_id)) {
          groupsMap.set(s.user_id, []);
        }
        groupsMap.get(s.user_id)!.push(fullStoryRecord);
      });

      const groups: StoryGroup[] = Array.from(groupsMap.entries()).map(
        ([uId, uStories]) => {
          const prof = profileMap.get(uId);
          const name = prof
            ? `${prof.first_name} ${prof.last_name}`.trim()
            : "User";
          const avatar = prof?.avatar_url || "/placeholder-avatar.png";

          return {
            userId: uId,
            userName: name,
            avatarUrl: avatar,
            stories: uStories,
            hasUnseen: true,
          };
        }
      );

      setStoryGroups(groups);
    } catch (err) {
      console.error("Failed to load user stories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();

    if (currentUserId) {
      supabase
        .from("profiles")
        .select("first_name, avatar_url")
        .eq("id", currentUserId)
        .single()
        .then(({ data }) => {
          if (data) setCurrentUserProfile(data);
        });
    }
  }, [currentUserId]);

  const myStoryGroup = storyGroups.find((g) => g.userId === currentUserId);
  const otherStoryGroups = storyGroups.filter((g) => g.userId !== currentUserId);

  return (
    <div className="w-full bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/80 rounded-2xl p-4 mb-6 shadow-xl">
      <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-none">
        {/* Your Story Button */}
        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <div className="relative cursor-pointer group">
            <div
              onClick={() => {
                if (myStoryGroup) {
                  setActiveViewerGroup(myStoryGroup);
                } else {
                  setIsCreateOpen(true);
                }
              }}
              className={`w-16 h-16 rounded-full p-0.5 border-2 ${
                myStoryGroup
                  ? "border-yellow-500"
                  : "border-dashed border-yellow-500/60"
              } group-hover:border-yellow-400 transition-colors flex items-center justify-center bg-neutral-950`}
            >
              <img
                src={currentUserProfile?.avatar_url || "/placeholder-avatar.png"}
                alt="Your Avatar"
                className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            {/* Plus Icon to always allow adding a new story */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsCreateOpen(true);
              }}
              title="Add new story"
              className="absolute bottom-0 right-0 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-black border-2 border-neutral-900 group-hover:scale-110 transition-transform shadow-md"
            >
              <Plus size={14} strokeWidth={3} />
            </div>
          </div>
          <span className="text-[11px] font-medium text-neutral-300 max-w-[68px] truncate">
            Your Story
          </span>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex items-center justify-center p-4">
            <Loader2 size={24} className="animate-spin text-yellow-500" />
          </div>
        )}

        {/* Other Users' Story Circles */}
        {!loading &&
          otherStoryGroups.map((group) => (
            <div
              key={group.userId}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
              onClick={() => setActiveViewerGroup(group)}
            >
              <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-500 via-amber-400 to-yellow-300 group-hover:scale-105 transition-transform shadow-md shadow-yellow-500/10">
                <div className="w-full h-full rounded-full p-0.5 bg-neutral-900">
                  <img
                    src={group.avatarUrl}
                    alt={group.userName}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-[11px] font-medium text-neutral-300 max-w-[68px] truncate">
                {group.userName}
              </span>
            </div>
          ))}
      </div>

      {/* Modal to Create Story */}
      {currentUserId && (
        <CreateStoryModal
          userId={currentUserId}
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onStoryCreated={fetchStories}
        />
      )}

      {/* Modal to View Story */}
      {activeViewerGroup && currentUserId && (
        <StoryViewerModal
          stories={activeViewerGroup.stories}
          currentUserId={currentUserId}
          isOpen={!!activeViewerGroup}
          onClose={() => setActiveViewerGroup(null)}
        />
      )}
    </div>
  );
}
