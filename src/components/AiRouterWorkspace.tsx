import React, { useState } from 'react';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  RefreshCw, 
  Terminal, 
  Copy, 
  Check, 
  ArrowRight, 
  Sliders, 
  Activity, 
  Database,
  Flame,
  Globe,
  Radio
} from 'lucide-react';
import { 
  AiModelProvider, 
  AiRouterSettings, 
  AiRouteLog 
} from '../types';

const INITIAL_PROVIDERS: AiModelProvider[] = [
  // Tier 1 Flagship
  {
    id: 'deepseek-v3',
    name: 'DeepSeek-V3 (MoE 671B)',
    provider: 'deepseek',
    modelCode: 'deepseek/deepseek-chat',
    tier: 'tier1',
    contextWindow: '128k',
    avgLatencyMs: 680,
    costPer1kTokens: 2.1,
    status: 'active',
    isLocal: false,
    capabilities: ['OCR Ekstraksi', 'Penalaran Bahasa Indonesia', 'Tabel Kompleks']
  },
  {
    id: 'gemini-15-pro',
    name: 'Google Gemini 1.5 Pro',
    provider: 'gemini',
    modelCode: 'gemini/gemini-1.5-pro',
    tier: 'tier1',
    contextWindow: '2M',
    avgLatencyMs: 820,
    costPer1kTokens: 18.5,
    status: 'standby',
    isLocal: false,
    capabilities: ['Multi-page Vision', 'Full Document PDF', 'Ultra Context']
  },
  {
    id: 'claude-35-sonnet',
    name: 'Anthropic Claude 3.5 Sonnet',
    provider: 'claude',
    modelCode: 'claude/claude-3-5-sonnet-20241022',
    tier: 'tier1',
    contextWindow: '200k',
    avgLatencyMs: 740,
    costPer1kTokens: 45.0,
    status: 'standby',
    isLocal: false,
    capabilities: ['Tulisan Tangan Sulit', 'Ekstraksi Formulir', 'High Precision']
  },

  // Tier 2 Fast & Cheap
  {
    id: 'gemini-20-flash',
    name: 'Google Gemini 2.0 Flash',
    provider: 'gemini',
    modelCode: 'gemini/gemini-2.0-flash',
    tier: 'tier2',
    contextWindow: '1M',
    avgLatencyMs: 240,
    costPer1kTokens: 1.5,
    status: 'active',
    isLocal: false,
    capabilities: ['Ultra Fast OCR', 'Sub-second Response', 'Low Cost']
  },
  {
    id: 'gpt-4o-mini',
    name: 'OpenAI GPT-4o Mini',
    provider: 'openai',
    modelCode: 'openai/gpt-4o-mini',
    tier: 'tier2',
    contextWindow: '128k',
    avgLatencyMs: 310,
    costPer1kTokens: 2.3,
    status: 'standby',
    isLocal: false,
    capabilities: ['Fast JSON Parsing', 'Structured Output', 'High Availability']
  },
  {
    id: 'qwen-25-vl',
    name: 'Qwen 2.5-VL 72B Instruct',
    provider: 'qwen',
    modelCode: 'qwen/qwen-2.5-vl-72b',
    tier: 'tier2',
    contextWindow: '128k',
    avgLatencyMs: 450,
    costPer1kTokens: 3.2,
    status: 'standby',
    isLocal: false,
    capabilities: ['Visual Document QA', 'OCR Tabel', 'Multilingual']
  },

  // Tier 3 Free & Offline Local
  {
    id: 'ollama-llama-vision',
    name: 'Local Ollama Llama-3.2-Vision (Offline)',
    provider: 'ollama',
    modelCode: 'ollama/llama3.2-vision:11b',
    tier: 'tier3',
    contextWindow: '128k',
    avgLatencyMs: 950,
    costPer1kTokens: 0,
    status: 'active',
    isLocal: true,
    capabilities: ['Zero Cloud Cost', '100% Offline LAN', 'Privasi Total Sekolah']
  },
  {
    id: 'dapodik-native-ocr',
    name: 'Dapodik Native OCR Fallback',
    provider: 'custom',
    modelCode: 'local/dapodik-tesseract-id',
    tier: 'tier3',
    contextWindow: '32k',
    avgLatencyMs: 380,
    costPer1kTokens: 0,
    status: 'standby',
    isLocal: true,
    capabilities: ['Direct Web Service Port 5774', 'Offline Parser', 'Emergency Fallback']
  }
];

const INITIAL_LOGS: AiRouteLog[] = [
  {
    id: 'LOG-RT-901',
    timestamp: 'Baru saja',
    taskType: 'OCR Ekstraksi',
    selectedTier: 'tier1',
    modelUsed: 'DeepSeek-V3 (MoE 671B)',
    fallbackTriggered: false,
    tokensRaw: 4250,
    tokensCompressed: 2620,
    tokensSavedPct: 38.4,
    latencyMs: 580,
    status: 'success'
  },
  {
    id: 'LOG-RT-902',
    timestamp: '2 menit lalu',
    taskType: 'Fuzzy Match Dapodik',
    selectedTier: 'tier2',
    modelUsed: 'Google Gemini 2.0 Flash',
    fallbackTriggered: true,
    fallbackReason: 'Tier 1 Rate Limit (HTTP 429) → Auto-Failover to Tier 2',
    tokensRaw: 8100,
    tokensCompressed: 4950,
    tokensSavedPct: 38.9,
    latencyMs: 290,
    status: 'fallback_success'
  },
  {
    id: 'LOG-RT-903',
    timestamp: '15 menit lalu',
    taskType: 'Analisis Dokumen',
    selectedTier: 'tier1',
    modelUsed: 'DeepSeek-V3 (MoE 671B)',
    fallbackTriggered: false,
    tokensRaw: 6400,
    tokensCompressed: 3910,
    tokensSavedPct: 38.9,
    latencyMs: 620,
    status: 'success'
  },
  {
    id: 'LOG-RT-904',
    timestamp: '1 jam lalu',
    taskType: 'Smart Chat',
    selectedTier: 'tier1',
    modelUsed: 'DeepSeek-V3 (MoE 671B)',
    fallbackTriggered: false,
    tokensRaw: 1850,
    tokensCompressed: 1140,
    tokensSavedPct: 38.4,
    latencyMs: 430,
    status: 'success'
  }
];

export const AiRouterWorkspace: React.FC = () => {
  const [providers] = useState<AiModelProvider[]>(INITIAL_PROVIDERS);
  const [settings, setSettings] = useState<AiRouterSettings>({
    tier1ModelId: 'deepseek-v3',
    tier2ModelId: 'gemini-20-flash',
    tier3ModelId: 'ollama-llama-vision',
    autoFallbackEnabled: true,
    timeoutMs: 4000,
    maxRetry: 2,
    rtkTokenSaver: true,
    cavemanMode: false,
    localProxyEndpoint: 'http://localhost:20128/v1',
    dapodikPort: '5774',
    activeTier: 'tier1'
  });

  const [logs, setLogs] = useState<AiRouteLog[]>(INITIAL_LOGS);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Playground State
  const [testPrompt, setTestPrompt] = useState<string>(
    `DOKUMEN DAFTAR KETIDAKHADIRAN KELAS VIII-B\n1. Ahmad Fausan (Sakit - Surat Dokter Terlampir)\n2. Siti Nurhalizah (Izin - Acara Keluarga)\n3. Kurniawan Dwi Y. (Alpa - Tanpa Keterangan)`
  );
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulateFailover, setSimulateFailover] = useState<boolean>(true);
  const [simulationResult, setSimulationResult] = useState<{
    routeChain: string[];
    tokensRaw: number;
    tokensCompressed: number;
    savedPct: number;
    latencyMs: number;
    jsonOutput: string;
  } | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationResult(null);

    setTimeout(() => {
      const rawLen = testPrompt.length * 1.8;
      const rawTokens = Math.round(rawLen);
      const compressedTokens = settings.rtkTokenSaver ? Math.round(rawTokens * 0.61) : rawTokens;
      const savedPct = settings.rtkTokenSaver ? 39.0 : 0;

      const chain = simulateFailover
        ? ['Tier 1: DeepSeek-V3 (429 Rate Limit)', 'Tier 2: Gemini 2.0 Flash (Success ✓)']
        : ['Tier 1: DeepSeek-V3 (Success ✓)'];

      const result = {
        routeChain: chain,
        tokensRaw: rawTokens,
        tokensCompressed: compressedTokens,
        savedPct,
        latencyMs: simulateFailover ? 320 : 540,
        jsonOutput: JSON.stringify({
          status: "SUCCESS_EXTRACTED",
          router_engine: "9Router v1.4.2",
          tier_executed: simulateFailover ? "tier2 (auto_failover)" : "tier1",
          model: simulateFailover ? "gemini-2.0-flash" : "deepseek-v3",
          rtk_compression_ratio: "-39.0%",
          records: [
            { no: 1, nama: "Ahmad Fausan", kelas: "VIII-B", status: "Sakit", keterangan: "Surat Dokter" },
            { no: 2, nama: "Siti Nurhalizah", kelas: "VIII-B", status: "Izin", keterangan: "Acara Keluarga" },
            { no: 3, nama: "Kurniawan Dwi Y.", kelas: "VIII-B", status: "Alpa", keterangan: "Tanpa Keterangan" }
          ]
        }, null, 2)
      };

      setSimulationResult(result);
      setIsSimulating(false);

      // Add to logs
      const newLog: AiRouteLog = {
        id: `LOG-RT-${Date.now().toString().slice(-4)}`,
        timestamp: 'Baru saja',
        taskType: 'OCR Ekstraksi',
        selectedTier: simulateFailover ? 'tier2' : 'tier1',
        modelUsed: simulateFailover ? 'Google Gemini 2.0 Flash' : 'DeepSeek-V3 (MoE 671B)',
        fallbackTriggered: simulateFailover,
        fallbackReason: simulateFailover ? 'Simulasi Tier 1 Timeout / Rate Limit → Auto-Fallback Tier 2' : undefined,
        tokensRaw: rawTokens,
        tokensCompressed: compressedTokens,
        tokensSavedPct: savedPct,
        latencyMs: result.latencyMs,
        status: simulateFailover ? 'fallback_success' : 'success'
      };

      setLogs(prev => [newLog, ...prev]);
    }, 1000);
  };

  const tier1Model = providers.find(p => p.id === settings.tier1ModelId);
  const tier2Model = providers.find(p => p.id === settings.tier2ModelId);
  const tier3Model = providers.find(p => p.id === settings.tier3ModelId);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Header Banner & Gateway Live Status */}
      <div className="bg-gradient-to-r from-[#020b1a] via-[#031534] to-[#042459] rounded-2xl p-6 sm:p-8 text-white border border-[#00E5FF]/30 shadow-md relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#00E5FF]" />
                9Router AI Gateway v1.4.2
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Proxy Online: {settings.localProxyEndpoint}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white flex items-center gap-2.5">
              Multi-Provider AI Router & 3-Tier Fallback Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Arsitektur cerdas terinspirasi dari <strong className="text-white">9Router</strong> untuk menghubungkan 40+ model AI (DeepSeek, Gemini, GPT-4o, Claude, Ollama) dengan sistem <em>auto-failover</em> 3-tingkat dan kompresi token RTK (-40% bandwidth).
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 p-3 rounded-xl border border-white/10 shrink-0">
            <div className="p-2.5 text-center bg-black/20 rounded-lg">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Token Saved (RTK)</div>
              <div className="text-lg font-black text-[#00E5FF] font-display">-38.8%</div>
              <div className="text-[10px] text-emerald-400 font-medium">580k tokens</div>
            </div>
            <div className="p-2.5 text-center bg-black/20 rounded-lg">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Avg Latency</div>
              <div className="text-lg font-black text-amber-300 font-display">290 ms</div>
              <div className="text-[10px] text-slate-300 font-medium">Ultra Cepat</div>
            </div>
            <div className="p-2.5 text-center bg-black/20 rounded-lg">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Auto-Failover</div>
              <div className="text-lg font-black text-emerald-400 font-display">100%</div>
              <div className="text-[10px] text-slate-300 font-medium">Anti 429 Block</div>
            </div>
            <div className="p-2.5 text-center bg-black/20 rounded-lg">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Active Tier</div>
              <div className="text-lg font-black text-white font-display">Tier 1 & 2</div>
              <div className="text-[10px] text-[#00E5FF] font-medium">Auto-Switch</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 3-Tier Architecture Visual Flow */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E6E6E6] shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-extrabold text-[#031534] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#006b55]" />
              Konfigurasi 3-Tier Auto-Fallback Router
            </h2>
            <p className="text-xs text-[#44474E]">
              Jika Tier 1 mencapai batas kuota / timeout, sistem otomatis beralih ke Tier 2 lalu Tier 3 tanpa menghentikan sinkronisasi Dapodik.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
              <input 
                type="checkbox" 
                checked={settings.autoFallbackEnabled} 
                onChange={(e) => setSettings(s => ({ ...s, autoFallbackEnabled: e.target.checked }))}
                className="w-4 h-4 text-[#006b55] rounded focus:ring-[#006b55]" 
              />
              <span className="text-xs font-bold text-[#031534]">Auto-Fallback Aktif</span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200">
              <input 
                type="checkbox" 
                checked={settings.rtkTokenSaver} 
                onChange={(e) => setSettings(s => ({ ...s, rtkTokenSaver: e.target.checked }))}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" 
              />
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                RTK Token Saver (-40%)
              </span>
            </label>
          </div>
        </div>

        {/* 3 Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* TIER 1 */}
          <div className="bg-gradient-to-b from-[#eff6ff] to-white rounded-xl p-5 border-2 border-blue-300 shadow-2xs space-y-4 relative">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black bg-blue-600 text-white uppercase tracking-wider">
                Tier 1 • Flagship / Primary
              </span>
              <span className="text-xs font-extrabold text-blue-700">Akurasi 99.4%</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Pilih Model Utama:</label>
              <select 
                value={settings.tier1ModelId}
                onChange={(e) => setSettings(s => ({ ...s, tier1ModelId: e.target.value }))}
                className="w-full bg-white border border-blue-300 rounded-lg px-3 py-2 text-xs font-bold text-[#031534] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {providers.filter(p => p.tier === 'tier1').map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.contextWindow})</option>
                ))}
              </select>
            </div>

            {tier1Model && (
              <div className="bg-white/80 p-3 rounded-lg text-xs space-y-1.5 border border-blue-100">
                <div className="flex justify-between text-slate-600">
                  <span>Model Code:</span>
                  <code className="text-blue-700 font-bold">{tier1Model.modelCode}</code>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Avg Latency:</span>
                  <span className="font-semibold text-slate-800">{tier1Model.avgLatencyMs} ms</span>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {tier1Model.capabilities.map((c, i) => (
                    <span key={i} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="text-[11px] text-blue-800 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              Prioritas Utama untuk Ekstraksi Form & Rapor
            </div>
          </div>

          {/* TIER 2 */}
          <div className="bg-gradient-to-b from-[#f0fdf4] to-white rounded-xl p-5 border-2 border-emerald-300 shadow-2xs space-y-4 relative">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black bg-emerald-600 text-white uppercase tracking-wider">
                Tier 2 • Fast & Cheap Fallback
              </span>
              <span className="text-xs font-extrabold text-emerald-700">Sub-300ms</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Pilih Model Cadangan Cepat:</label>
              <select 
                value={settings.tier2ModelId}
                onChange={(e) => setSettings(s => ({ ...s, tier2ModelId: e.target.value }))}
                className="w-full bg-white border border-emerald-300 rounded-lg px-3 py-2 text-xs font-bold text-[#031534] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {providers.filter(p => p.tier === 'tier2').map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.contextWindow})</option>
                ))}
              </select>
            </div>

            {tier2Model && (
              <div className="bg-white/80 p-3 rounded-lg text-xs space-y-1.5 border border-emerald-100">
                <div className="flex justify-between text-slate-600">
                  <span>Model Code:</span>
                  <code className="text-emerald-700 font-bold">{tier2Model.modelCode}</code>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Avg Latency:</span>
                  <span className="font-semibold text-emerald-800">{tier2Model.avgLatencyMs} ms</span>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {tier2Model.capabilities.map((c, i) => (
                    <span key={i} className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="text-[11px] text-emerald-800 flex items-center gap-1.5 font-medium">
              <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
              Otomatis aktif jika Tier 1 429 / Quota Exceeded
            </div>
          </div>

          {/* TIER 3 */}
          <div className="bg-gradient-to-b from-[#faf5ff] to-white rounded-xl p-5 border-2 border-purple-300 shadow-2xs space-y-4 relative">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black bg-purple-600 text-white uppercase tracking-wider">
                Tier 3 • Free & Local LAN
              </span>
              <span className="text-xs font-extrabold text-purple-700">100% Offline</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Pilih Model Offline Mandiri:</label>
              <select 
                value={settings.tier3ModelId}
                onChange={(e) => setSettings(s => ({ ...s, tier3ModelId: e.target.value }))}
                className="w-full bg-white border border-purple-300 rounded-lg px-3 py-2 text-xs font-bold text-[#031534] focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {providers.filter(p => p.tier === 'tier3').map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.contextWindow})</option>
                ))}
              </select>
            </div>

            {tier3Model && (
              <div className="bg-white/80 p-3 rounded-lg text-xs space-y-1.5 border border-purple-100">
                <div className="flex justify-between text-slate-600">
                  <span>Endpoint Local:</span>
                  <code className="text-purple-700 font-bold">{tier3Model.modelCode}</code>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Biaya Cloud:</span>
                  <span className="font-semibold text-emerald-600">Rp 0 (Gratis)</span>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {tier3Model.capabilities.map((c, i) => (
                    <span key={i} className="text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-200">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="text-[11px] text-purple-800 flex items-center gap-1.5 font-medium">
              <Database className="w-4 h-4 text-purple-600 shrink-0" />
              Berjalan di Server Sekolah (Tanpa Internet)
            </div>
          </div>

        </div>
      </div>

      {/* 3. Live Router Simulator & Token Killer (RTK) Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Interactive Input & Controls */}
        <div className="bg-white rounded-2xl p-6 border border-[#E6E6E6] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#031534] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#006b55]" />
              Simulator Routing & Kompresi RTK
            </h3>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              Live Test Payload
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-[#031534] block mb-1">
              Payload Teks OCR Dokumen Sekolah:
            </label>
            <textarea 
              rows={4}
              value={testPrompt}
              onChange={(e) => setTestPrompt(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#006b55]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={simulateFailover} 
                onChange={(e) => setSimulateFailover(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500" 
              />
              <span className="text-xs font-bold text-amber-800">
                Simulasikan Tier 1 Error (Uji Auto-Failover)
              </span>
            </label>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="px-5 py-2.5 rounded-xl bg-[#031534] text-white hover:bg-[#006b55] text-xs font-extrabold transition-all shadow-xs flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Memproses Router...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                  Jalankan Ekstraksi & Router
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Simulation Output & Token Savings */}
        <div className="bg-[#020b1a] rounded-2xl p-6 text-white border border-slate-800 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00E5FF]" />
                Hasil Eksekusi 9Router
              </span>
              {simulationResult && (
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  Latency: {simulationResult.latencyMs} ms
                </span>
              )}
            </div>

            {simulationResult ? (
              <div className="space-y-3">
                {/* Fallback Chain Visualization */}
                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-bold">Rute Eksekusi:</span>
                  {simulationResult.routeChain.map((step, idx) => (
                    <span 
                      key={idx} 
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        step.includes('Success') 
                          ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700' 
                          : 'bg-red-950/80 text-red-300 border border-red-800'
                      }`}
                    >
                      {step}
                    </span>
                  ))}
                </div>

                {/* Token Savings Metric */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                    <span className="text-[10px] text-slate-400 block">Raw Tokens</span>
                    <span className="font-bold text-slate-200">{simulationResult.tokensRaw}</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                    <span className="text-[10px] text-slate-400 block">RTK Compressed</span>
                    <span className="font-bold text-[#00E5FF]">{simulationResult.tokensCompressed}</span>
                  </div>
                  <div className="bg-emerald-950/40 p-2 rounded-lg border border-emerald-800">
                    <span className="text-[10px] text-emerald-400 block">Hemat Token</span>
                    <span className="font-extrabold text-emerald-300">-{simulationResult.savedPct}%</span>
                  </div>
                </div>

                {/* JSON Output */}
                <pre className="bg-black/60 p-3 rounded-lg text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-36 border border-slate-800">
                  {simulationResult.jsonOutput}
                </pre>
              </div>
            ) : (
              <div className="py-10 text-center text-slate-500 text-xs">
                Klik tombol <strong>"Jalankan Ekstraksi & Router"</strong> untuk melihat proses simulasi failover dan kompresi token secara langsung.
              </div>
            )}
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80">
            <span>Dapodik Connector: Port {settings.dapodikPort} (Ready)</span>
            <span className="text-[#00E5FF]">RTK Compressor Active ✓</span>
          </div>
        </div>

      </div>

      {/* 4. Local CLI & 9Router Proxy Setup Guide */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E6E6E6] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-[#031534] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#006b55]" />
              Panduan Setup 9Router Endpoint untuk Server Sekolah
            </h3>
            <p className="text-xs text-[#44474E]">
              Hubungkan aplikasi Dapodik lokal dan alat AI coding Anda ke endpoint OpenAI-compatible lokal.
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            Port: 20128
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Step 1 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-5 h-5 rounded-full bg-[#031534] text-white text-[11px] font-extrabold flex items-center justify-center">1</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Install</span>
            </div>
            <p className="text-xs font-bold text-[#031534]">Install 9Router CLI</p>
            <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
              <code className="text-[11px] text-slate-700 font-mono">npm install -g 9router</code>
              <button 
                onClick={() => handleCopy('npm install -g 9router', 'step1')}
                className="text-slate-400 hover:text-slate-700"
              >
                {copiedCode === 'step1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-5 h-5 rounded-full bg-[#031534] text-white text-[11px] font-extrabold flex items-center justify-center">2</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Jalankan</span>
            </div>
            <p className="text-xs font-bold text-[#031534]">Start Gateway & Dashboard</p>
            <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
              <code className="text-[11px] text-slate-700 font-mono">9router --port 20128</code>
              <button 
                onClick={() => handleCopy('9router --port 20128', 'step2')}
                className="text-slate-400 hover:text-slate-700"
              >
                {copiedCode === 'step2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-5 h-5 rounded-full bg-[#031534] text-white text-[11px] font-extrabold flex items-center justify-center">3</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Endpoint</span>
            </div>
            <p className="text-xs font-bold text-[#031534]">Arahkan Tool ke Proxy</p>
            <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
              <code className="text-[11px] text-slate-700 font-mono">http://localhost:20128/v1</code>
              <button 
                onClick={() => handleCopy('http://localhost:20128/v1', 'step3')}
                className="text-slate-400 hover:text-slate-700"
              >
                {copiedCode === 'step3' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 5. Live Router Logs Table */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E6E6E6] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-[#031534] flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#006b55]" />
            Riwayat Routing & Failover Log
          </h3>
          <span className="text-xs text-slate-500">
            Menampilkan {logs.length} transaksi terakhir
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <th className="py-2.5 px-3">Waktu</th>
                <th className="py-2.5 px-3">Tugas</th>
                <th className="py-2.5 px-3">Tier</th>
                <th className="py-2.5 px-3">Model AI</th>
                <th className="py-2.5 px-3">Failover Status</th>
                <th className="py-2.5 px-3">Token Raw → RTK</th>
                <th className="py-2.5 px-3 text-right">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 text-slate-500 font-medium">{log.timestamp}</td>
                  <td className="py-3 px-3 font-bold text-[#031534]">{log.taskType}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      log.selectedTier === 'tier1' ? 'bg-blue-100 text-blue-800' :
                      log.selectedTier === 'tier2' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {log.selectedTier}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800">{log.modelUsed}</td>
                  <td className="py-3 px-3">
                    {log.fallbackTriggered ? (
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Auto-Failover ✓
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Direct Primary
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">
                    {log.tokensRaw} → <strong className="text-emerald-700">{log.tokensCompressed}</strong> (-{log.tokensSavedPct}%)
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-700">{log.latencyMs} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
