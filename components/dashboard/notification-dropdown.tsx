"use client"

import { useState } from "react"
import { Bell, Check, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  timestamp: Date
}

const defaultNotifications: Notification[] = [
  {
    id: "1",
    title: "Portfolio Published",
    message: "Your portfolio 'Creative Designer Portfolio' has been published successfully",
    type: "success",
    read: false,
    timestamp: new Date(Date.now() - 5 * 60000),
  },
  {
    id: "2",
    title: "New Visitor",
    message: "Someone viewed your portfolio from New York",
    type: "info",
    read: false,
    timestamp: new Date(Date.now() - 15 * 60000),
  },
  {
    id: "3",
    title: "Upgrade Available",
    message: "Unlock advanced customization with Pro tier",
    type: "warning",
    read: true,
    timestamp: new Date(Date.now() - 2 * 60 * 60000),
  },
]

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications)
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleDeleteAll = () => {
    setNotifications([])
  }

  const getTypeStyles = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-950 border-l-4 border-green-400"
      case "error":
        return "bg-red-50 dark:bg-red-950 border-l-4 border-red-400"
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-400"
      case "info":
      default:
        return "bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-accent rounded-full">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 max-h-96 p-0">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          {notifications.length > 0 && (
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="text-xs h-7"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Read all
                </Button>
              )}
              {notifications.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDeleteAll}
                  className="text-xs h-7"
                >
                  Clear all
                </Button>
              )}
            </div>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mb-2 opacity-50" />
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-80">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-border last:border-b-0 ${getTypeStyles(notification.type)} ${
                  !notification.read ? "opacity-100" : "opacity-75"
                } transition-opacity hover:opacity-100 cursor-pointer`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground line-clamp-1">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-foreground/80 line-clamp-2 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatTime(notification.timestamp)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(notification.id)
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
