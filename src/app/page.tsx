'use client';

import React, { useState } from 'react';
import { Loader2, Sparkles, Copy, Check } from 'lucide-react';

export default function Page() {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = async () => {
    setLoading(true);
    setPrompt('');
    setCopied(false);
    try {
      const host = window.location.hostname === 'localhost' ? 'http://localhost:8787' : '';
      const res = await fetch(`${host}/generate/pokemon`);
      const data = await res.json();

      if (data.success) {
        setPrompt(data.imageGenerationPrompt);
      } else {
        setPrompt('プロンプトの生成に失敗しました。');
      }
    } catch (error) {
      console.error(error);
      setPrompt('エラーが発生しました。Honoサーバー（8787）が起動しているか確認してください。');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight flex items-center justify-center gap-3">
            Poke prompt
          </h1>
          <p className="text-slate-500 text-lg">
            画像生成が有料プランだったので
            <br />ポケモンをランダムに取得してそのまま画像生成AIに投げれば
            <br />著作権を突破できるほどのポケモン？の画像が生成できます。
          </p>
        </header>

        <div className="space-y-8">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`
              w-full py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-300
              flex items-center justify-center gap-3
              ${loading
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] shadow-blue-200'
              }
            `}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-6 h-6" />
                プロンプトを生成中...
              </>
            ) : (
              'ランダムにプロンプトを生成'
            )}
          </button>

          {prompt && !loading && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                  Generated Result
                </h2>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 text-sm font-medium transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                <div className="relative bg-slate-900 rounded-2xl p-7 font-mono text-sm sm:text-base leading-relaxed text-slate-300 border border-slate-800 shadow-inner">
                  {prompt}
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                <p className="text-xs text-blue-700/80 leading-relaxed">
                  このプロンプトを任意の画像生成AI（Imagen 3, Midjourney, Stable Diffusion等）にコピー＆ペーストしてご利用いただけます。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
