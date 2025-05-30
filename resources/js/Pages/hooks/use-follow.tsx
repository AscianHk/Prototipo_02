"use client"

import { useState, useEffect } from "react"

interface FollowState {
  isFollowing: boolean
  followersCount: number
  followingCount: number
}

export function useFollow(userId: number, currentUserId?: number) {
  const [followState, setFollowState] = useState<FollowState>({
    isFollowing: false,
    followersCount: 0,
    followingCount: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Simular carga del estado de seguimiento desde localStorage
    const followData = localStorage.getItem(`follow_${userId}`)
    if (followData) {
      setFollowState(JSON.parse(followData))
    } else {
      // Datos simulados
      setFollowState({
        isFollowing: false,
        followersCount: Math.floor(Math.random() * 100) + 10,
        followingCount: Math.floor(Math.random() * 50) + 5,
      })
    }
  }, [userId])

  const toggleFollow = async () => {
    if (!currentUserId || userId === currentUserId) return

    setIsLoading(true)

    // Simular llamada a la API
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newState = {
      ...followState,
      isFollowing: !followState.isFollowing,
      followersCount: followState.isFollowing ? followState.followersCount - 1 : followState.followersCount + 1,
    }

    setFollowState(newState)
    localStorage.setItem(`follow_${userId}`, JSON.stringify(newState))
    setIsLoading(false)
  }

  return {
    ...followState,
    isLoading,
    toggleFollow,
  }
}
