// Study Wallah - Secure YouTube API
// File: api/youtube.js

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Only GET requests are allowed."
    });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: "YouTube API key is not configured."
    });
  }

  try {
    const {
      q = "NEET JEE preparation",
      subject = "",
      type = "video",
      maxResults = "12"
    } = req.query || {};

    let searchQuery = String(q).trim();

    if (subject) {
      searchQuery += ` ${String(subject).trim()}`;
    }

    if (!searchQuery) {
      searchQuery = "NEET JEE preparation";
    }

    const limit = Math.min(
      Math.max(
        Number.parseInt(maxResults, 10) || 12,
        1
      ),
      25
    );

    const params = new URLSearchParams({
      part: "snippet",
      q: searchQuery,
      type: type === "channel" ? "channel" : "video",
      maxResults: String(limit),
      safeSearch: "moderate",
      key: apiKey
    });

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${params.toString()}`
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "YouTube API error:",
        data
      );

      return res.status(response.status).json({
        success: false,
        error: "YouTube API request failed.",
        details:
          data?.error?.message ||
          "Unknown YouTube API error."
      });
    }

    const items = (data.items || [])
      .map((item) => {
        const videoId =
          item?.id?.videoId;

        if (!videoId) {
          return null;
        }

        return {
          videoId,
          title:
            item?.snippet?.title || "",
          description:
            item?.snippet?.description || "",
          channelTitle:
            item?.snippet?.channelTitle || "",
          channelId:
            item?.snippet?.channelId || "",
          publishedAt:
            item?.snippet?.publishedAt || "",
          thumbnail:
            item?.snippet?.thumbnails?.high?.url ||
            item?.snippet?.thumbnails?.medium?.url ||
            item?.snippet?.thumbnails?.default?.url ||
            ""
        };
      })
      .filter(Boolean);

    return res.status(200).json({
      success: true,
      items
    });

  } catch (error) {
    console.error(
      "Study Wallah YouTube error:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        "YouTube service is temporarily unavailable."
    });
  }
}
