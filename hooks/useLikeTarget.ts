// hooks/useLikeTarget.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeTarget } from "@/actions/likes";

export function useLikeTarget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      type,
      action,
    }: { id: string; type: "Question" | "Answer"; action: "like" | "dislike" }) => {
      return likeTarget(id, type, action);
    },

    onMutate: async ({ id, type, action }) => {
      // cancel ongoing refetches
      await queryClient.cancelQueries({ queryKey: ["feed"] });

      // snapshot previous data
      const previousFeed = queryClient.getQueryData<any[]>(["feed"]);

      // optimistic update
      queryClient.setQueryData<any[]>(["feed"], (old = []) =>
        old.map((q) =>
          q._id === id
            ? {
                ...q,
                likes: action === "like" ? q.likes + 1 : q.likes - 1,
                isLike: action === "like",
              }
            : q
        )
      );

      return { previousFeed };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousFeed) {
        queryClient.setQueryData(["feed"], context.previousFeed);
      }
    },

   
  });
}
