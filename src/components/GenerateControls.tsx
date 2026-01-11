import { useState } from "react";
import { Button, Input } from "@crayonai/react-ui";
import { Settings, Sparkles } from "lucide-react";
import { ThemeCustomization, ThemeMode } from "../types/theme";
import { getApiKey, setApiKey, clearApiKey } from "../utils/apiKeyStorage";
import { generateThemeWithAI } from "../utils/aiThemeGenerator";
import { toast } from "sonner";

interface GenerateControlsProps {
  customization: ThemeCustomization;
  currentMode: ThemeMode;
  onThemeGenerated: (theme: ThemeCustomization) => void;
  onApiKeyChange: () => void;
}

const CONVERSATION_STARTERS = [
  "JavaScript/TypeScript Advent of Code playground",
  "Retro Terminal UI, green phosphor glow",
  "Monochrome Manga-inspired theme",
  "I want a minimal Ghibli Studio vibe",
];

export function GenerateControls({
  customization,
  currentMode,
  onThemeGenerated,
  onApiKeyChange,
}: GenerateControlsProps) {
  const [apiKey, setApiKeyState] = useState(getApiKey() || "");
  const [showSetup, setShowSetup] = useState(!getApiKey());
  const [loadingStarter, setLoadingStarter] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [manualPrompt, setManualPrompt] = useState("");

  const hasApiKey = !!getApiKey();

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }
    try {
      setApiKey(apiKey.trim());
      setShowSetup(false);
      onApiKeyChange();
      toast.success("API key saved successfully");
    } catch (err) {
      toast.error("Failed to save API key");
    }
  };

  const handleClearApiKey = () => {
    try {
      clearApiKey();
      setApiKeyState("");
      setShowSetup(true);
      onApiKeyChange();
      toast.success("API key cleared");
    } catch (err) {
      toast.error("Failed to clear API key");
    }
  };

  const handleGenerate = async (description: string) => {
    const key = getApiKey();
    if (!key) {
      toast.error("Please set up your API key first");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter a theme description");
      return;
    }

    setLoadingStarter(description);
    setError(null);

    try {
      const generatedTheme = await generateThemeWithAI(
        key,
        description,
        customization,
        currentMode
      );
      onThemeGenerated(generatedTheme);
      toast.success("Theme generated successfully!");
      setManualPrompt(""); // Clear input on success
    } catch (err: any) {
      const errorMessage = err.message || "Failed to generate theme";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoadingStarter(null);
    }
  };

  if (showSetup || !hasApiKey) {
    return (
      <div
        style={{
          padding: "48px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
        }}
      >
        <div
          style={{
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 600,
              marginBottom: "12px",
              color: "var(--crayon-primary-text)",
            }}
          >
            Set up OpenAI API Key
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "var(--crayon-secondary-text)",
              marginBottom: "32px",
              lineHeight: 1.5,
            }}
          >
            Your API key is stored locally in your browser and never sent to our
            servers. It's only used to call OpenAI directly from your browser.
          </p>
          <div style={{ marginBottom: "16px" }}>
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKeyState(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveApiKey();
                }
              }}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "14px",
              }}
            />
          </div>
          <Button
            onClick={handleSaveApiKey}
            variant="primary"
            style={{
              width: "100%",
              marginBottom: "16px",
            }}
          >
            Save API Key
          </Button>
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "13px",
              color: "var(--link-text, var(--primary))",
              textDecoration: "none",
            }}
          >
            Get your API key from OpenAI
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "48px 24px 24px",
        display: "flex",
        flexDirection: "column",
        minHeight: "400px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "32px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 500,
            color: "var(--crayon-primary-text)",
            lineHeight: 1.2,
            marginBottom: "24px",
            flex: 1,
          }}
        >
          What can I help you theme?
        </h1>
        <button
          onClick={() => setShowSetup(true)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--crayon-secondary-text)",
            borderRadius: "6px",
          }}
          title="Manage API key"
        >
          <Settings size={20} />
        </button>
      </div>

      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <textarea
          value={manualPrompt}
          onChange={(e) => setManualPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              handleGenerate(manualPrompt);
            }
          }}
          placeholder="Describe your theme... (Cmd/Ctrl + Enter to generate)"
          disabled={!!loadingStarter}
          style={{
            width: "100%",
            minHeight: "100px",
            padding: "12px 16px",
            fontSize: "15px",
            borderRadius: "8px",
            border: "1px solid var(--crayon-stroke-emphasis)",
            backgroundColor: "var(--crayon-background-fills)",
            color: "var(--crayon-primary-text)",
            resize: "vertical",
            fontFamily: "inherit",
            lineHeight: 1.5,
          }}
        />
        <Button
          onClick={() => handleGenerate(manualPrompt)}
          variant="primary"
          disabled={!!loadingStarter || !manualPrompt.trim()}
          style={{
            marginTop: "12px",
            width: "100%",
          }}
        >
          {loadingStarter === manualPrompt ? (
            <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "16px",
                  height: "16px",
                  border: "2px solid currentColor",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              Generating...
            </span>
          ) : (
            <>
              <Sparkles size={16} style={{ marginRight: "8px" }} />
              Generate Theme
            </>
          )}
        </Button>
      </div>

      <div
        style={{
          marginBottom: "12px",
          fontSize: "13px",
          color: "var(--crayon-secondary-text)",
          fontWeight: 500,
        }}
      >
        Or try a conversation starter:
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {CONVERSATION_STARTERS.map((starter) => (
          <button
            key={starter}
            onClick={() => handleGenerate(starter)}
            disabled={!!loadingStarter}
            style={{
              padding: "16px 20px",
              borderRadius: "8px",
              border: "1px solid var(--crayon-stroke-emphasis)",
              backgroundColor: "var(--crayon-background-fills)",
              color: "var(--crayon-primary-text)",
              fontSize: "15px",
              textAlign: "left",
              cursor: loadingStarter ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              opacity: loadingStarter && loadingStarter !== starter ? 0.5 : 1,
              position: "relative",
            }}
            onMouseEnter={(e) => {
              if (!loadingStarter) {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--crayon-stroke-emphasis)";
              e.currentTarget.style.backgroundColor = "var(--crayon-background-fills)";
            }}
          >
            {loadingStarter === starter ? (
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    border: "2px solid var(--primary)",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                Generating...
              </span>
            ) : (
              starter
            )}
          </button>
        ))}
      </div>

      {error && (
        <div
          style={{
            marginTop: "24px",
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor: "var(--bg-danger, #fee)",
            color: "var(--danger)",
            fontSize: "14px",
            border: "1px solid var(--danger)",
          }}
        >
          {error}
        </div>
      )}

      {showSetup && hasApiKey && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--crayon-stroke-emphasis)",
          }}
        >
          <h3
            style={{
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "12px",
              color: "var(--crayon-primary-text)",
            }}
          >
            API Key Settings
          </h3>
          <Button
            onClick={handleClearApiKey}
            variant="secondary"
            style={{ width: "100%" }}
          >
            Clear API Key
          </Button>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
