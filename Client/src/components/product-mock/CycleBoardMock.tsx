"use client";

import { useState } from "react";
import {
  ArrowDownUp,
  ArrowRight,
  CalendarDays,
  ChartNoAxesCombined,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  Circle,
  CircleDashed,
  CircleHelp,
  Clock3,
  FolderKanban,
  Inbox,
  LayoutGrid,
  List,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { OrbitLogo } from "@/components/marketing/OrbitLogo";
import { cn } from "@/lib/utils";

type Status = "todo" | "progress" | "done";
type Issue = {
  id: number;
  title: string;
  tag: string;
  assignee: string;
  color: string;
  status: Status;
  priority: "high" | "medium";
  comments?: number;
};
const INITIAL: Issue[] = [
  {
    id: 128,
    title: "Explore the new dashboard direction",
    tag: "Design",
    assignee: "AK",
    color: "peach",
    status: "todo",
    priority: "medium",
    comments: 3,
  },
  {
    id: 131,
    title: "Build a better onboarding flow",
    tag: "Product",
    assignee: "MR",
    color: "lavender",
    status: "todo",
    priority: "high",
    comments: 2,
  },
  {
    id: 134,
    title: "Write API documentation",
    tag: "Engineering",
    assignee: "SN",
    color: "blue",
    status: "todo",
    priority: "medium",
  },
  {
    id: 126,
    title: "Bring the command menu to life",
    tag: "Engineering",
    assignee: "JL",
    color: "mint",
    status: "progress",
    priority: "high",
    comments: 4,
  },
  {
    id: 129,
    title: "A fresh look for project views",
    tag: "Design",
    assignee: "AK",
    color: "peach",
    status: "progress",
    priority: "medium",
    comments: 6,
  },
  {
    id: 122,
    title: "Connect the GitHub integration",
    tag: "Engineering",
    assignee: "JL",
    color: "mint",
    status: "done",
    priority: "high",
    comments: 2,
  },
  {
    id: 123,
    title: "Polish empty states",
    tag: "Design",
    assignee: "MR",
    color: "lavender",
    status: "done",
    priority: "medium",
  },
];
const COLUMNS = [
  { key: "todo", label: "To do", icon: CircleDashed },
  { key: "progress", label: "In progress", icon: Clock3 },
  { key: "done", label: "Done", icon: CheckCheck },
] as const;

export function CycleBoardMock({ className }: { className?: string }) {
  const [issues, setIssues] = useState(INITIAL);
  const [view, setView] = useState<"board" | "list">("board");
  const [filter, setFilter] = useState(false);
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newStatus, setNewStatus] = useState<Status>("todo");
  const [ascending, setAscending] = useState(false);
  const visible = issues
    .filter(
      (issue) =>
        (!filter || issue.priority === "high") &&
        issue.title.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) => (ascending ? a.id - b.id : b.id - a.id));
  const done = issues.filter((issue) => issue.status === "done").length;
  function openNew(status: Status = "todo") {
    setNewStatus(status);
    setDialogOpen(true);
  }
  function advance(id: number) {
    setIssues((items) =>
      items.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              status:
                issue.status === "todo"
                  ? "progress"
                  : issue.status === "progress"
                    ? "done"
                    : "todo",
            }
          : issue,
      ),
    );
  }
  function issueCard(issue: Issue) {
    return (
      <button
        key={issue.id}
        type="button"
        className={cn("board-card", issue.status === "done" && "is-done")}
        onClick={() => advance(issue.id)}
        aria-label={
          issue.title +
          ": " +
          (issue.status === "todo"
            ? "move to in progress"
            : issue.status === "progress"
              ? "mark done"
              : "move to to do")
        }
      >
        <div className="board-card-top">
          <span className={"issue-tag tag-" + issue.tag.toLowerCase()}>
            {issue.tag}
          </span>
          <MoreHorizontal size={14} />
        </div>
        <h4>{issue.title}</h4>
        <div className="board-card-bottom">
          <span className="issue-id">ORB-{issue.id}</span>
          <span className={cn("priority-bars", issue.priority)}>
            <i />
            <i />
            <i />
          </span>
          {issue.comments && (
            <span className="issue-comments">
              <MessageSquare size={11} />
              {issue.comments}
            </span>
          )}
          <span className={"person-avatar avatar-" + issue.color}>
            {issue.assignee}
          </span>
        </div>
      </button>
    );
  }
  return (
    <div className={cn("workspace-preview", className)}>
      <aside className="workspace-sidebar" aria-label="Preview workspace">
        <div className="workspace-brand">
          <OrbitLogo />
          <ChevronDown size={12} />
        </div>
        <div className="workspace-switch">
          <span className="workspace-avatar">S</span>
          <span>
            Studio workspace
            <small>
              Pro plan <span>↗</span>
            </small>
          </span>
          <ChevronDown size={12} />
        </div>
        <div className="sidebar-links">
          <span>
            <Inbox size={14} /> Inbox <i>4</i>
          </span>
          <span>
            <Circle size={14} /> My issues
          </span>
          <span>
            <LayoutGrid size={14} /> Overview
          </span>
        </div>
        <div className="sidebar-section-title">
          WORKSPACE <Plus size={11} />
        </div>
        <div className="sidebar-links">
          <span className="selected">
            <FolderKanban size={14} /> Projects <ChevronDown size={11} />
          </span>
          <span className="sidebar-project">
            <span className="project-dot" /> Website 2.0
          </span>
          <span>
            <ChartNoAxesCombined size={14} /> Cycles
          </span>
          <span>
            <Sparkles size={14} /> AI triage <b>NEW</b>
          </span>
          <span>
            <CalendarDays size={14} /> Roadmap
          </span>
        </div>
        <div className="sidebar-bottom">
          <div className="upgrade-note">
            <Sparkles size={15} />
            <strong>A little extra orbit.</strong>
            <small>More focus. Less busywork.</small>
            <a href="#demo">
              Try the live sandbox <ArrowRight size={11} />
            </a>
          </div>
          <span>
            <CircleHelp size={13} /> Help &amp; getting started
          </span>
        </div>
      </aside>
      <div className="workspace-main">
        <div className="workspace-breadcrumb">
          <span>
            Workspace <ChevronRight size={11} /> Projects{" "}
            <ChevronRight size={11} /> <strong>Website 2.0</strong>
          </span>
          <span className="preview-label">DEMO WORKSPACE</span>
        </div>
        <div className="workspace-title-row">
          <div>
            <div className="project-eyebrow">
              <span className="project-dot" /> PRODUCT &amp; ENGINEERING
            </div>
            <h3>
              Good things in the making<span>✳</span>
            </h3>
            <p>
              A fresh start for our next chapter. Let&apos;s make it a good one.
            </p>
          </div>
          <div className="team-avatars">
            <span className="person-avatar avatar-peach">AK</span>
            <span className="person-avatar avatar-lavender">MR</span>
            <span className="person-avatar avatar-mint">JL</span>
            <span className="person-avatar avatar-extra">+2</span>
          </div>
        </div>
        <div className="workspace-tabs">
          <span className="active">
            <FolderKanban size={13} /> Board <small>{issues.length}</small>
          </span>
          <span className="cycle-indicator">
            <span className="status-dot" /> Cycle 24 <span>·</span> {done}/
            {issues.length} completed
          </span>
        </div>
        <div className="board-toolbar">
          <div className="board-view-toggle">
            <button
              type="button"
              onClick={() => setView("board")}
              aria-pressed={view === "board"}
              aria-label="Board view"
              className={cn(view === "board" && "active")}
            >
              <LayoutGrid size={13} />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              aria-label="List view"
              className={cn(view === "list" && "active")}
            >
              <List size={14} />
            </button>
          </div>
          <button
            type="button"
            className={cn("toolbar-button", filter && "active-filter")}
            onClick={() => setFilter(!filter)}
            aria-pressed={filter}
          >
            <SlidersHorizontal size={12} />{" "}
            {filter ? "High priority" : "Filter"}
            {filter && <X size={10} />}
          </button>
          <button
            type="button"
            className="toolbar-button sort-button"
            onClick={() => setAscending(!ascending)}
            aria-label={"Sort " + (ascending ? "newest" : "oldest") + " first"}
          >
            <ArrowDownUp size={12} /> Sort
          </button>
          <label className="board-search">
            <Search size={13} />
            <input
              aria-label="Search preview issues"
              placeholder="Search issues..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <button
            type="button"
            className="new-issue-button"
            onClick={() => openNew()}
          >
            <Plus size={12} /> New issue
          </button>
        </div>
        <div
          className={cn("kanban-board", view === "list" && "board-list-view")}
        >
          {COLUMNS.map((column) => (
            <div
              className={"kanban-column column-" + column.key}
              key={column.key}
            >
              <div className="kanban-column-heading">
                <column.icon size={13} />
                <strong>{column.label}</strong>
                <span>
                  {
                    visible.filter((issue) => issue.status === column.key)
                      .length
                  }
                </span>
                <button
                  type="button"
                  aria-label={"Add issue to " + column.label}
                  onClick={() => openNew(column.key)}
                >
                  <Plus size={13} />
                </button>
              </div>
              <div className="kanban-cards">
                {visible
                  .filter((issue) => issue.status === column.key)
                  .map(issueCard)}
              </div>
              <button
                type="button"
                className="add-board-issue"
                onClick={() => openNew(column.key)}
              >
                <Plus size={12} /> Add issue
              </button>
            </div>
          ))}
          {visible.length === 0 && (
            <p className="board-empty">
              No matching issues. Try another search or clear the filter.
            </p>
          )}
        </div>
        <div className="workspace-status">
          <span>
            <span className="status-dot" /> All changes saved
          </span>
          <span>
            Click an issue to move it forward <ArrowRight size={10} />
          </span>
        </div>
      </div>
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="issue-dialog-overlay" />
          <Dialog.Content className="issue-dialog">
            <Dialog.Title>Create an issue</Dialog.Title>
            <Dialog.Description>
              Add to this demo workspace. Changes stay in this preview.
            </Dialog.Description>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (!newTitle.trim()) return;
                setIssues((items) => [
                  ...items,
                  {
                    id: Math.max(...items.map((item) => item.id)) + 1,
                    title: newTitle.trim(),
                    tag: "Product",
                    assignee: "YO",
                    color: "mint",
                    status: newStatus,
                    priority: "medium",
                  },
                ]);
                setNewTitle("");
                setDialogOpen(false);
              }}
            >
              <label htmlFor="preview-issue-title">Issue title</label>
              <input
                id="preview-issue-title"
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                placeholder="What are we building next?"
                required
                maxLength={120}
              />
              <button type="submit" className="new-issue-button">
                <Plus size={14} /> Create issue
              </button>
            </form>
            <Dialog.Close
              className="issue-dialog-close"
              aria-label="Close create issue"
            >
              <X size={18} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
