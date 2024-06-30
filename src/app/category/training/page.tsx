"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/app/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { YouTubeEmbed } from "@next/third-parties/google";

interface Menu {
  name: string;
  position?: string;
  image?: string;
  description: string;
  youtubeId?: string;
  gender: string;
}

interface MenuContentProps {
  menus: Menu[];
  gender: string;
}

const maleTrainingMenus = [
  {
    name: "スクワット",
    position: "脚",
    gender: "male",
    image: "/images/squat.jpeg",
    description: `下半身強化だけでなく、全身の引き締めにも効果があるオーソドックスなスクワットです。\n1. バーベルを肩に担ぎ、背筋を伸ばして胸を張り、足を肩幅程度に開いて立ちます。\n2. ゆっくりと体を沈めていき、大腿部が床と平行になるまで膝を曲げたら、今度は元に戻します。息を吸いながら体を下ろし、吐きながら上げます。10回繰り返します。`,
    youtubeId: "AZ34UPH5reg",
  },
  {
    name: "ベンチプレス",
    position: "胸",
    gender: "male",
    description: `胸の筋肉を鍛え、上半身の力を強化するエクササイズです。\n1. ベンチに仰向けになり、バーを肩幅より少し広めに握ります。\n足は床にしっかりとつけ、体を安定させます。\n2. ゆっくりとバーを胸の中央に向かって下ろします。\n肘は約45度の角度に保ち、息を吸いながら下ろします。\n3.バーを胸から押し上げて元の位置に戻します。\n腕をまっすぐに伸ばし、息を吐きながら持ち上げます。10回繰り返します。`,
    image: "/images/chest.png",
    youtubeId: "W36C1YcI1MM",
  },
  {
    name: "デッドリフト",
    position: "背中",
    gender: "male",
    description:
      "背中の王道種目です。姿勢改善にも効果抜群のエクササイズです。\n1.足を肩幅に開いてバーを握ります。バーを握る手幅も肩幅と同様程度です。\n2. 腰を落とし、背中を真っすぐに保ちながらバーを持ち上げます。この時の意識は、胸を張り、お尻を後から日っ張られるイメージです。綱引きをしている感覚に近いです。\n3. 膝を伸ばし、背中を真っすぐに保ちながらバーを下ろします。\n4. 膝を曲げ、背中を真っすぐに保ちながらバーを持ち上げます。10回繰り返します。",
    image: "/images/deadlift.jpeg",
    youtubeId: "YXvcaAAToKo",
  },
  {
    name: "ブルガリアンスクワット",
    position: "脚",
    gender: "male",
    description:
      "ベンチに後ろ脚を乗せ、片足で行うスクワット。通常のスクワットより、前脚側の大臀筋を強烈に刺激できる。ハードな片足の多関節種目。\n1.両手にダンベルを持って、背筋を伸ばす。片膝をベンチに乗せて片足立ちになる。\n2. 背筋を伸ばしたまま、前足に体重を乗せて、重心を沈み込める。ここから前足を踏み込んで、1の体勢に戻る。",
    image: "/images/squat.jpeg",
    youtubeId: "EHrkpTeX-mE",
  },
  {
    name: "アブローラー",
    position: "腹",
    gender: "male",
    description:
      "アブローラーは、腹直筋と体幹を鍛えるエクササイズ。\n1. アブローラーを両手で握り、膝を床につけてスタートポジションを取る。背筋を伸ばし、腰を反らさないように注意する。\n2. 息を吐きながら、ゆっくりとアブローラーを前方に転がし、体を伸ばす。このとき、腹筋と体幹の筋肉を意識する。\n3. 息を吸いながら、腹筋を使ってアブローラーを元の位置に戻す。動作をコントロールしながら行い、筋肉の収縮を感じる。",
    image: "/images/abs.png",
    youtubeId: "WIH9fRKxmRk",
  },
  {
    name: "懸垂",
    position: "背中",
    gender: "male",
    description:
      "ベンチに後ろ脚を乗せ、片足で行うスクワット。通常のスクワットより、前脚側の大臀筋を強烈に刺激できる。ハードな片足の多関節種目。\n1.バーを肩幅の1.5倍に程度に握り、膝を曲げる。\n2. 胸を張り、胸をバーの中心に当てに行くようなぜか非機能に体を引き上げる。無理に高く体をあげようとするとフォームが崩れてしまうため、体を引き上げる高さにこだわる必要はない。",
    image: "",
    youtubeId: "xo4Lx_UU-Vw",
  },
  {
    name: "サイドレイズ",
    position: "肩(三角筋中部)",
    gender: "male",
    description:
      "肩の側面をメインに、前部をサブとして行う肩のトレーニング。逆三角形の後ろ姿を作るための視点となる肩の重要なトレーニング。\n1.ダンベルを両手に持ち、足を肩幅に開いて立つ。肩は落としておき、肩に重さが載っている感覚をつかむ。\n2.腕を伸ばしたまま、ゆっくりと横に持ち上げる。  肘を軽く曲げ、肩の高さまで持ち上げる。ポイントは、腹筋に力を入れながら上げること。\n3.上げた腕をゆっくりと下す。ポイントは、力を抜かず、ゆっくり耐えながら降ろすこと。",
    image: "/images/三角筋中部.png",
    youtubeId: "w5pHxxa3udQ",
  },
  {
    name: "ダンベルカール",
    position: "腕(上腕二頭筋)",
    gender: "male",
    description:
      "腕の内側を鍛えるトレーニング。\n1.ダンベルを両手に持ち、足を肩幅に開いて立つ。腕を体の横にまっすぐに伸ばす。\n2.ダンベルを肩に向かって持ち上げる。 ポイント：肩は固定し、肘のみを動かして、上腕二頭筋をしっかりと収縮させる。\n3.ゆっくりダンベルを降ろす。ポイント：ゆっくりと負荷に耐えながら降ろすこと。",
    image: "/images/二頭筋.jpg",
    youtubeId: "kW3cN3umJYU",
  },
  {
    name: "ライイングトライセプスEX",
    position: "腕(上腕三頭筋)",
    gender: "male",
    description:
      "腕の裏側の筋肉を強化し、上腕三頭筋を発達させるエクササイズ。\n1.ベンチに仰向けになり、ダンベルまたはEZバーを肩幅で握る。腕をまっすぐに伸ばし、バーを頭の上に持ち上げる。 \n2.肘を曲げてバーを額に向かってゆっくりと下ろす。上腕は動かさず、肘だけを動かす。 \n3.ゆっくりと腕を伸ばして元の位置に戻す。呼吸を整えながら動作を行う。10回繰り返す。 ",
    image: "/images/三頭筋肉.png",
    youtubeId: "UNFn-RvhxJg",
  },
  {
    name: "インクラインダンベルカール",
    position: "腕",
    gender: "male",
    description:
      "上腕二頭筋の代表的な種目。アジャストベンチを使用し、角度をつけることでより、高刺激な負荷が掛かる種目。\n1.インクラインベンチに45度の角度で座り、ダンベルを両手に持つ。 腕を自然に垂らし、手のひらが前を向くようにする。 \n2.ダンベルを肩に向かって持ち上げる。 ポイント：肩は固定し、肘のみを動かして、上腕二頭筋をしっかりと収縮させる。\n3.ゆっくりダンベルを降ろす。ポイント：ゆっくりと負荷に耐えながら降ろすこと。",
    image: "/images/二頭筋.jpg",
    youtubeId: "CJRyDtJoNO4",
  },
  {
    name: "ショルダープレス",
    position: "肩",
    gender: "male",

    description:
      "肩の前側を鍛える種目。肩の前側を鍛えると、肩幅が広く、上半身全体が大きく見える。\n1.アジャストベンチの背もたれを垂直より、１つ傾斜をつけた角度に設定する。ベンチ部分は、床と並行にする。 \n2.適切な重量のダンベルを持ち、膝の上にダンベルを乗せる。\n3.ダンベルを片方ずつ、蹴り上げて、ダンベルが顎の高さくらいに設定するる。\n4.手ではなく、肘から上げる意識でダンベルを上げる。上げる高さは、限界まで。\n5.ゆっくりと重さに耐えながら、元の位置まで降ろす。",
    image: "/images/三角筋前部.png",
    youtubeId: "65nfStbDc0I",
  },
];

const femaleTrainingMenus = [
  {
    name: "ヒップスラスト",
    position: "尻",
    gender: "female",
    description:
      "臀部の筋肉を強化し、ヒップアップ効果を狙うエクササイズ。\n1.ベンチに肩甲骨を乗せ、バーベルを腰の上に置く。足を肩幅に開き、膝を90度に曲げる。 \n2.お尻を締めながら腰を持ち上げ、肩から膝までが一直線になるようにする。バーベルを安定させ、臀部の筋肉を収縮させる。 \n3.ゆっくりと腰を元の位置に戻す。呼吸を整えながら動作を行う。10回繰り返す。",
    image: "/images/大臀筋.jpeg",
    youtubeId: "WGen-gnr88U",
  },
  {
    name: "ラットプルダウン",
    position: "背中",
    gender: "female",
    url: "/training/women/lat-pulldown",
    description:
      "臀部の筋肉を強化し、ヒップアップ効果を狙うエクササイズ。\n1.ベンチに肩甲骨を乗せ、バーベルを腰の上に置く。足を肩幅に開き、膝を90度に曲げる。 \n2.お尻を締めながら腰を持ち上げ、肩から膝までが一直線になるようにする。バーベルを安定させ、臀部の筋肉を収縮させる。 \n3.ゆっくりと腰を元の位置に戻す。呼吸を整えながら動作を行う。10回繰り返す。",
    image: "/images/広背筋.jpeg",
    youtubeId: "X_dUYiIuxeo",
  },
  {
    name: "レッグプレス",
    position: "尻・もも裏",
    gender: "female",
    description:
      "臀部とハムストリングスを強化するエクササイズ。\n1.レッグプレスマシンに座り、足を肩幅に開いてプレートに置く。 \n2.足でプレートを押し出し、膝を伸ばす。 臀部とハムストリングスに力を入れる。 \n3.ゆっくりと腰を元の位置に戻す。呼吸を整えながら動作を行う。10回繰り返す。",
    image: "/images/大臀筋.jpeg",
    youtubeId: "EjZC-RCMGc0",
  },
  {
    name: "ルーマニアンデッドリフト",
    position: "ハムストリングス",
    gender: "female",
    description:
      "臀部とハムストリングスを強化するエクササイズ。バーベルor ダンベルどちらでも可能なトレーニングです。\n1.ダンベルを肩幅で握り、足を肩幅に開いて立つ。背筋を伸ばし、膝を軽く曲げる。 \n2.背中をまっすぐに保ちながら、腰を後ろに引いてバーベルをゆっくりと下ろす。ハムストリングと臀部に負荷をかける \n3.ダンベルを膝のあたりまで下ろしたら、ゆっくりと元の位置に戻す。 呼吸を整えながら動作を行う。10回繰り返す。",
    image: "/images/ハムストリング.png",
    youtubeId: "J5BhlSyi14k",
  },
  {
    name: "シーテッドロウ",
    position: "背中",
    gender: "female",
    description:
      "真正面からおもりを引いて、背中の筋肉を鍛える種目です。ラットプルダウンとは異な刺激を得ることができ、綺麗な後ろ姿を作ることができます。\n1.脚を肩幅に程度開き、グリップを握ります。 背筋を伸ばし、膝を軽く曲げる。\n2.肘を引き、ハンドルをお腹に向かって引く。肩甲骨(肩の後部)を寄せ、背中の筋肉を収縮させる。\n3.ゆっくりとハンドルを元の位置に戻す。呼吸を整えながら動作を行う。10回繰り返す。",
    image: "/images/広背筋.jpeg",
    youtubeId: "VqTI2jDKdVg",
  },
  {
    name: "インナーサイ・アウターサイ",
    position: "大臀筋(お尻の筋肉)・ハムストリングス",
    gender: "female",
    description:
      "アブダクションは、お尻や外腿の筋肉を鍛えるエクササイズ。\n1. まず、アブダクションマシンに座る。両脚をパッドの内側に置き、背筋を伸ばして座る。ハンドルを握ってしっかり支える。\n2. 息を吐きながら、ゆっくりと両脚を外側に開く。このとき、お尻の筋肉が収縮するのを感じる。膝が90度以上に開かないように注意。\n3. 息を吸いながら、ゆっくりと元の位置に戻す。動作はゆっくりとコントロールし、筋肉の伸びを感じながら行う。\n",
    image: "/images/大臀筋.jpeg",
    youtubeId: "dRwP0sYQO4Q",
  },
  {
    name: "バックエクステンション",
    position: "大殿筋・ハムストリングス",
    gender: "female",
    description:
      "バックエクステンションは、大臀筋とハムストリングスを鍛えるエクササイズ。\n1. バックエクステンションベンチにうつ伏せになり、足首を固定する。手は胸の前でクロスするか、頭の後ろに置く。\n2. 背筋を使って上体をゆっくりと持ち上げる。腰を反らしすぎないように注意しながら、大臀筋とハムストリングスの収縮を感じる。\n3. ゆっくりと上体を元の位置に戻す。動作はコントロールしながら行い、筋肉の伸びを感じる。",
    image: "/images/バックエクステンション.jpeg",
    youtubeId: "xmDcl2JlVDw",
  },
  {
    name: "ケーブルヒップキックバック",
    position: "尻",
    gender: "female",
    description:
      "ケーブルヒップキックバックは、大臀筋を鍛えるエクササイズ。\n1. ケーブルマシンに足首用アタッチメントを取り付け、足首に装着する。軽く前傾姿勢をとり、両手でマシンの支柱を持つ。\n2. 足を後ろに向かって蹴り出すように動かし、大臀筋の収縮を感じる。背筋を伸ばしたまま動作を行うことを意識する。\n3. ゆっくりと足を元の位置に戻す。動作をコントロールしながら、筋肉の伸びを感じる。",
    image: "/images/大臀筋.jpeg",
    youtubeId: "eJMuAmromm4",
  },
  {
    name: "腹筋マシン",
    position: "腹",
    gender: "female",
    description:
      "腹筋マシンは、腹直筋を鍛えるエクササイズ。ジムによって、多少マシンの作りや軌道は、異なるが、基本的なフォームは同じ。\n1. 腹筋マシンに座り、足をパッドに固定する。ハンドルを握り、背筋を伸ばして姿勢を整える。\n2. 息を吐きながら、ゆっくりと上体を前に曲げる。このとき、腹直筋の収縮を感じる。\n3. 息を吸いながら、ゆっくりと上体を元の位置に戻す。動作をコントロールしながら、筋肉の伸びを感じる。",
    image: "/images/abs.png",
    youtubeId: "DkJg6TDLYqk",
  },
  {
    name: "スクワット",
    position: "脚＆尻",
    gender: "female",
    description:
      "スクワットは、脚とお尻の筋肉を鍛えるエクササイズ。\n1. 足を肩幅に開き、つま先を少し外側に向ける。背筋を伸ばし、胸を張る。\n2. 息を吸いながら、膝を曲げて腰をゆっくりと下げる。膝がつま先より前に出ないように注意しながら、お尻を後ろに突き出すように動作を行う。\n3. 太ももが床と平行になるまで下げたら、息を吐きながら元の位置に戻る。動作をコントロールしながら、脚とお尻の筋肉を意識する。",
    image: "/images/大臀筋.jpeg",
    youtubeId: "v7NXrATHvjw",
  },
  {
    name: "ブルガリアンスクワット",
    position: "脚＆尻",
    gender: "female",
    description:
      "ブルガリアンスクワットは、脚とお尻の筋肉を鍛えるエクササイズ。\n1. 片足をベンチや台に乗せ、もう片方の足を前に出して立つ。前足の膝がつま先と一直線になるように調整する。\n2. 息を吸いながら、前足の膝を曲げて腰をゆっくりと下げる。後ろ足の膝が床に近づくまで下げる。\n3. 息を吐きながら、前足のかかとで押し上げるようにして元の位置に戻る。動作をコントロールしながら、脚とお尻の筋肉を意識する。",
    image: "/images/大臀筋.jpeg",
    youtubeId: "9VcTfpEZqYA",
  },
  {
    name: "レッグカール",
    position: "ハムストリングス",
    gender: "female",
    description:
      "レッグカールは、主にハムストリングス（太ももの裏側）を鍛えるエクササイズ。\n1. レッグカールマシンに仰向けに横たわり、足首をパッドに固定する。両手でグリップを握り、しっかりと支える。\n2. 息を吐きながら、ゆっくりと足を曲げてパッドをお尻に近づける。このとき、ハムストリングスの収縮を感じる。\n3. 息を吸いながら、ゆっくりと足を元の位置に戻す。動作をコントロールしながら、筋肉の伸びを感じる。",
    image: "/images/ハムストリング.png",
    youtubeId: "5TDcNAGP-dw",
  },
  {
    name: "アブローラー",
    position: "腹",
    gender: "female",
    description:
      "アブローラーは、腹直筋と体幹を鍛えるエクササイズ。\n1. アブローラーを両手で握り、膝を床につけてスタートポジションを取る。背筋を伸ばし、腰を反らさないように注意する。\n2. 息を吐きながら、ゆっくりとアブローラーを前方に転がし、体を伸ばす。このとき、腹筋と体幹の筋肉を意識する。\n3. 息を吸いながら、腹筋を使ってアブローラーを元の位置に戻す。動作をコントロールしながら行い、筋肉の収縮を感じる。",
    image: "/images/abs.png",
    youtubeId: "WIH9fRKxmRk",
  },
];

// 共通のコンポーネント
const MenuContent: React.FC<MenuContentProps> = ({ menus, gender }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {menus
      .filter((menu) => menu.gender === gender)
      .map((menu) => (
        <Card key={menu.name} className="mb-4">
          <CardHeader>
            <CardTitle>
              {menu.name}
              {menu.position && (
                <>
                  <br />
                  部位：{menu.position}
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">詳細を見る</Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl p-4 sm:p-6 md:p-8 mx-auto max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold mb-4">
                    {menu.name}
                  </DialogTitle>
                  <DialogDescription className="text-xl font-semibold mb-2">
                    対象部位: {menu.position}
                  </DialogDescription>
                </DialogHeader>
                <Image
                  src={menu.image || "/default-image.jpg"} // 画像が未定義の場合はデフォルト画像を使用
                  alt={`${menu.name}の対象筋肉`}
                  className="w-full h-auto mb-4"
                  layout="responsive"
                  width={560}
                  height={315}
                />
                <h3 className="text-2xl font-bold mb-2">説明</h3>
                <p className="mb-4 whitespace-pre-line">{menu.description}</p>
                <h3 className="text-2xl font-bold mb-2">解説動画</h3>
                {menu.youtubeId && (
                  <div className="relative pb-9/16 overflow-hidden mb-4">
                    <YouTubeEmbed
                      videoid={menu.youtubeId}
                      height={300}
                      params="controls=1"
                    />
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
  </div>
);

export default function TrainingTutorialPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("male");

  const filteredMaleMenus = maleTrainingMenus.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFemaleMenus = femaleTrainingMenus.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          トレーニング解説
        </h1>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="メニューを検索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2"
          />
        </div>
        <div className="mb-10">
          <Button asChild>
            <Link
              href="/basics"
              className="text-white bg-blue-500 hover:bg-blue-700 p-3 rounded-lg block text-center"
            >
              筋トレする上で大切なこと
            </Link>
          </Button>
        </div>
        <Separator className="mb-10" />
        <Tabs
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value)}
        >
          <TabsList>
            <TabsTrigger value="male">男性メニュー解説</TabsTrigger>
            <TabsTrigger value="female">女性メニュー解説</TabsTrigger>
          </TabsList>
          <TabsContent value="male">
            <MenuContent menus={filteredMaleMenus} gender="male" />
          </TabsContent>
          <TabsContent value="female">
            <MenuContent menus={filteredFemaleMenus} gender="female" />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
