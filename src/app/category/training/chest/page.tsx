"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { YouTubeEmbed } from "@next/third-parties/google";

// ウィンドウサイズの型定義
interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

interface TrainingSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  videoId: string;
}

const TrainingSection: React.FC<TrainingSectionProps> = ({
  title,
  description,
  imageUrl,
  videoId,
}) => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // 初期サイズを設定

    return () => window.removeEventListener("resize", handleResize); // クリーンアップ
  }, []);

  // YouTube動画のオプション、レスポンシブ対応
  const opts = {
    height: windowSize.width && windowSize.width < 400 ? "194" : "390",
    width: windowSize.width && windowSize.width < 400 ? "320" : "640",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h2 style={{ color: "#333", fontSize: "24px" }}>{title}</h2>
      <p>{description}</p>
      <Image
        src={imageUrl}
        alt={title}
        width={300}
        height={500}
        style={{ maxWidth: "100%", height: "auto" }}
      />
      {/* <YouTube videoId={videoId} opts={opts} /> */}
      <YouTubeEmbed videoid={videoId} height={400} params="controls=0" />
    </div>
  );
};

const ChestTrainingPage: React.FC = () => {
  return (
    <div>
      <TrainingSection
        title="ベンチプレス"
        description="ベンチプレスは胸の筋肉を中心に鍛える基本的なトレーニングです。"
        imageUrl="/chest/5830939caa0e357c2d83ae015c6ecaf3_w.jpeg"
        videoId="W36C1YcI1MM"
      />
      <TrainingSection
        title="ダンベルプレス"
        description="ダンベルプレスは胸の筋肉に深い刺激を与えることができるトレーニングです。"
        imageUrl="/chest/5830939caa0e357c2d83ae015c6ecaf3_w.jpeg"
        videoId="Q-Tgm5yP_Lg"
      />
      <TrainingSection
        title="ディップス"
        description="ディップスは上腕三頭筋と下胸を同時に鍛えることができます。"
        imageUrl="/chest/5830939caa0e357c2d83ae015c6ecaf3_w.jpeg"
        videoId="VAFvPzqBOfY"
      />
    </div>
  );
};

export default ChestTrainingPage;
