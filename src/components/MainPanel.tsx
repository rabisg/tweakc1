import {
  C1Chat,
  useThreadManager,
  useThreadListManager,
  Message,
  ThemeProvider,
} from "@thesysai/genui-sdk";
import { toast } from "sonner";
import { useEffect } from "react";

// Reusable C1 DSL response sample
const SAMPLE_C1_RESPONSE = `<content thesys="true">{
  "component": {
    "component": "Card",
    "props": {
      "children": [
        {
          "component": "Header",
          "props": {
            "title": "Hello there! 👋"
          }
        },
        {
          "component": "TextContent",
          "props": {
            "textMarkdown": "Hi! Great to meet you. I'm here to help you explore and discover information with rich visuals and interactive content. Whether you're curious about places, products, concepts, or anything else, I'll make sure to provide you with engaging and comprehensive answers.\\n\\nWhat would you like to explore today?"
          }
        }
      ]
    }
  },
  "error": null
}</content>`;

// Mock thread data
const MOCK_THREADS = [
  {
    threadId: "thread-1",
    title: "Welcome Conversation",
    createdAt: new Date("2025-01-09T10:00:00Z"),
  },
  {
    threadId: "thread-2",
    title: "Getting Started with C1",
    createdAt: new Date("2025-01-08T15:30:00Z"),
  },
  {
    threadId: "thread-3",
    title: "Exploring Features",
    createdAt: new Date("2025-01-07T09:15:00Z"),
  },
];

// Mock messages for each thread
const MOCK_MESSAGES: Record<string, Message[]> = {
  "thread-1": [
    {
      id: "msg-1-1",
      role: "user",
      content: "Hello!",
    },
    {
      id: "msg-1-2",
      role: "assistant",
      content: SAMPLE_C1_RESPONSE,
    },
    {
      id: "msg-1-3",
      role: "user",
      content: "Tell me more",
    },
    {
      id: "msg-1-4",
      role: "assistant",
      content: SAMPLE_C1_RESPONSE,
    },
  ],
  "thread-2": [
    {
      id: "msg-2-1",
      role: "user",
      content: "How does C1 work?",
    },
    {
      id: "msg-2-2",
      role: "assistant",
      content: SAMPLE_C1_RESPONSE,
    },
  ],
  "thread-3": [
    {
      id: "msg-3-1",
      role: "user",
      content: "What can you do?",
    },
    {
      id: "msg-3-2",
      role: "assistant",
      content: SAMPLE_C1_RESPONSE,
    },
    {
      id: "msg-3-3",
      role: "user",
      content: "Show me examples",
    },
    {
      id: "msg-3-4",
      role: "assistant",
      content: SAMPLE_C1_RESPONSE,
    },
  ],
};

interface MainPanelProps {
  mode?: "light" | "dark";
  theme?: Record<string, any>;
  darkTheme?: Record<string, any>;
}

export function MainPanel({
  mode = "light",
  theme,
  darkTheme,
}: MainPanelProps) {
  const threadListManager = useThreadListManager({
    fetchThreadList: async () => {
      return MOCK_THREADS;
    },
    createThread: async () => {
      toast.info("This is a demo - try the playground at console.thesys.dev");
      throw new Error("Cannot create thread in demo mode");
    },
    deleteThread: async () => {
      // No-op
    },
    updateThread: async (thread) => {
      return thread;
    },
    onSelectThread: () => {
      // No-op
    },
    onSwitchToNew: () => {
      // No-op
    },
  });

  const threadManager = useThreadManager({
    threadListManager,
    loadThread: async (threadId) => {
      return MOCK_MESSAGES[threadId] || [];
    },
    onUpdateMessage: async () => {
      // No-op
    },
    processMessage: async () => {
      toast.info("This is a demo - try the playground at console.thesys.dev");
      // Return a mock response that will trigger the toast but not actually process
      throw new Error("Backend not available in demo mode");
    },
  });

  // Auto-select first thread on mount
  useEffect(() => {
    if (
      threadListManager.threads.length > 0 &&
      !threadListManager.selectedThreadId
    ) {
      threadListManager.selectThread(threadListManager.threads[0].threadId);
    }
  }, [
    threadListManager.threads.length,
    threadListManager.selectedThreadId,
    threadListManager,
  ]);

  return (
    <main className="flex-1 relative">
      <div className="absolute inset-0">
        <ThemeProvider mode={mode} theme={theme} darkTheme={darkTheme}>
          <C1Chat
            scrollVariant="once"
            threadManager={threadManager}
            threadListManager={threadListManager}
          />
        </ThemeProvider>
      </div>
    </main>
  );
}
