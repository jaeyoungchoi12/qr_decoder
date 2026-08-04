(() => {
  "use strict";

  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const preview = document.getElementById("preview");
  const previewImg = document.getElementById("previewImg");
  const clearBtn = document.getElementById("clearBtn");
  const result = document.getElementById("result");

  const langSwitcher = document.getElementById("langSwitcher");
  const langBtn = document.getElementById("langBtn");
  const langLabel = document.getElementById("langLabel");
  const langMenu = document.getElementById("langMenu");

  // ---- i18n --------------------------------------------------------------

  const I18N = {
    ko: {
      _name: "한국어",
      subtitle: "이미지를 끌어다 놓거나 클릭해서 QR 코드 이미지를 올려주세요.",
      dzTitle: "QR 이미지를 여기로 끌어다 놓으세요",
      dzSub: '또는 <span class="dz-link">클릭해서 파일 선택</span> · <kbd>Ctrl/⌘</kbd> + <kbd>V</kbd> 붙여넣기',
      dropHere: "여기에 놓으세요",
      previewLabel: "미리보기",
      clear: "지우기",
      footer: "모든 처리는 브라우저 안에서 이루어집니다 · 이미지는 서버로 전송되지 않습니다",
      dropzoneAria: "QR 이미지 업로드 영역. 파일을 끌어다 놓거나 클릭하여 선택하세요.",
      successTitle: "디코딩 완료",
      errorTitle: "QR 코드를 찾지 못했습니다",
      copy: "복사",
      copied: "복사됨!",
      openLink: "링크 열기",
      chars: "글자",
      bytes: "바이트",
      version: "버전",
      errNoLib: "디코딩 라이브러리를 불러오지 못했습니다. 인터넷 연결을 확인한 뒤 새로고침 해주세요.",
      errNoQR: "이미지에서 QR 코드를 인식하지 못했습니다. 더 선명하거나 QR이 잘 보이는 이미지를 사용해 보세요.",
      errLoadImg: "이미지를 불러올 수 없습니다. 다른 파일을 시도해 주세요.",
      errOnlyImg: "이미지 파일만 지원합니다.",
      errReadFile: "파일을 읽는 중 오류가 발생했습니다.",
      type_url: "URL", type_wifi: "Wi-Fi", type_email: "이메일", type_tel: "전화",
      type_vcard: "연락처", type_event: "일정", type_scheme: "링크", type_json: "JSON", type_text: "텍스트",
      featuresTitle: "QR Decoder를 쓰는 이유",
      feat1Title: "100% 비공개",
      feat1Desc: "이미지는 브라우저 안에서만 처리되며, 어떤 서버에도 업로드되지 않습니다.",
      feat2Title: "즉시 · 무료",
      feat2Desc: "가입도 제한도 없이 QR 코드를 1초 만에 무료로 디코딩합니다.",
      feat3Title: "모든 이미지",
      feat3Desc: "끌어다 놓기, 클립보드 붙여넣기, 파일 선택 모두 지원. PNG·JPG·WEBP·GIF·SVG 형식을 지원합니다.",
      howTitle: "QR 코드 디코딩 방법",
      step1: "QR 코드가 담긴 이미지를 끌어다 놓거나 붙여넣거나 선택하세요.",
      step2: "브라우저 안에서 QR 코드가 즉시 인식되어 디코딩됩니다.",
      step3: "결과를 복사하거나 링크를 클릭 한 번으로 엽니다.",
      aboutTitle: "온라인 QR 코드 리더란?",
      aboutText: "온라인 QR 코드 리더는 카메라로 스캔하는 대신 이미지 파일에서 QR 코드의 내용을 읽어주는 도구입니다. QR Decoder는 URL, Wi-Fi 정보, 이메일, 전화번호, 연락처(vCard), 일정, 일반 텍스트를 인식하며, 모든 처리가 브라우저 안에서 이루어져 이미지가 외부로 전송되지 않습니다.",
      faqTitle: "자주 묻는 질문",
      faq1Q: "QR Decoder는 무료인가요?",
      faq1A: "네. 계정 생성이나 설치 없이 완전히 무료로 사용할 수 있습니다.",
      faq2Q: "이미지가 서버로 업로드되나요?",
      faq2A: "아니요. 모든 디코딩은 브라우저 안에서 처리되므로 이미지가 기기를 벗어나지 않습니다.",
      faq3Q: "어떤 파일 형식을 지원하나요?",
      faq3A: "PNG, JPG, WEBP, GIF, SVG 이미지를 지원합니다.",
      faq4Q: "스크린샷의 QR 코드도 읽을 수 있나요?",
      faq4A: "네. 스크린샷을 복사한 뒤 Ctrl/⌘ + V로 붙여넣거나, 이미지 파일을 업로드하면 됩니다.",
      faq5Q: "어떤 언어를 지원하나요?",
      faq5A: "영어, 한국어, 중국어, 일본어를 지원합니다.",
    },
    en: {
      _name: "English",
      subtitle: "Drag and drop an image or click to upload a QR code image.",
      dzTitle: "Drag your QR image here",
      dzSub: 'or <span class="dz-link">click to choose a file</span> · <kbd>Ctrl/⌘</kbd> + <kbd>V</kbd> to paste',
      dropHere: "Drop it here",
      previewLabel: "Preview",
      clear: "Clear",
      footer: "Everything runs in your browser · Images are never sent to a server",
      dropzoneAria: "QR image upload area. Drag and drop a file or click to select.",
      successTitle: "Decoded successfully",
      errorTitle: "No QR code found",
      copy: "Copy",
      copied: "Copied!",
      openLink: "Open link",
      chars: "chars",
      bytes: "bytes",
      version: "Version",
      errNoLib: "Failed to load the decoding library. Check your connection and refresh.",
      errNoQR: "Couldn't detect a QR code in the image. Try a clearer image where the QR is fully visible.",
      errLoadImg: "Couldn't load the image. Please try another file.",
      errOnlyImg: "Only image files are supported.",
      errReadFile: "An error occurred while reading the file.",
      type_url: "URL", type_wifi: "Wi-Fi", type_email: "Email", type_tel: "Phone",
      type_vcard: "Contact", type_event: "Event", type_scheme: "Link", type_json: "JSON", type_text: "Text",
      featuresTitle: "Why QR Decoder?",
      feat1Title: "100% Private",
      feat1Desc: "Images are processed entirely in your browser and are never uploaded to any server.",
      feat2Title: "Instant & Free",
      feat2Desc: "Decode QR codes in a second — no sign-up, no limits, completely free.",
      feat3Title: "Any Image",
      feat3Desc: "Drag & drop, paste from the clipboard, or pick a file. PNG, JPG, WEBP, GIF and SVG are supported.",
      howTitle: "How to decode a QR code",
      step1: "Drop, paste, or select an image that contains a QR code.",
      step2: "The QR code is detected and decoded instantly, right in your browser.",
      step3: "Copy the result or open the link with a single click.",
      aboutTitle: "What is an online QR code reader?",
      aboutText: "An online QR code reader lets you read the contents of a QR code from an image file instead of scanning it with a camera. QR Decoder recognizes URLs, Wi-Fi credentials, email addresses, phone numbers, contact cards (vCard), calendar events and plain text — all in your browser, so your images stay completely private.",
      faqTitle: "Frequently asked questions",
      faq1Q: "Is QR Decoder free to use?",
      faq1A: "Yes. It is completely free, with no account or installation required.",
      faq2Q: "Are my images uploaded to a server?",
      faq2A: "No. All decoding happens locally in your browser, so your images never leave your device.",
      faq3Q: "Which file formats are supported?",
      faq3A: "PNG, JPG, WEBP, GIF and SVG images are all supported.",
      faq4Q: "Can I read a QR code from a screenshot?",
      faq4A: "Yes. Copy the screenshot and paste it with Ctrl/⌘ + V, or upload the image file directly.",
      faq5Q: "Which languages are supported?",
      faq5A: "The interface is available in English, Korean, Chinese and Japanese.",
    },
    zh: {
      _name: "中文",
      subtitle: "拖放图片或点击上传二维码图片。",
      dzTitle: "将二维码图片拖到这里",
      dzSub: '或 <span class="dz-link">点击选择文件</span> · <kbd>Ctrl/⌘</kbd> + <kbd>V</kbd> 粘贴',
      dropHere: "放到这里",
      previewLabel: "预览",
      clear: "清除",
      footer: "所有处理均在浏览器中完成 · 图片不会上传到服务器",
      dropzoneAria: "二维码图片上传区域。拖放文件或点击选择。",
      successTitle: "解码成功",
      errorTitle: "未找到二维码",
      copy: "复制",
      copied: "已复制！",
      openLink: "打开链接",
      chars: "字符",
      bytes: "字节",
      version: "版本",
      errNoLib: "无法加载解码库。请检查网络连接后刷新页面。",
      errNoQR: "无法在图片中识别二维码。请使用更清晰、二维码完整可见的图片。",
      errLoadImg: "无法加载图片。请尝试其他文件。",
      errOnlyImg: "仅支持图片文件。",
      errReadFile: "读取文件时发生错误。",
      type_url: "网址", type_wifi: "Wi-Fi", type_email: "邮箱", type_tel: "电话",
      type_vcard: "联系人", type_event: "日程", type_scheme: "链接", type_json: "JSON", type_text: "文本",
      featuresTitle: "为什么选择 QR Decoder？",
      feat1Title: "100% 隐私",
      feat1Desc: "图片完全在您的浏览器中处理，绝不会上传到任何服务器。",
      feat2Title: "即时 · 免费",
      feat2Desc: "无需注册、没有限制，一秒钟即可免费解码二维码。",
      feat3Title: "任意图片",
      feat3Desc: "支持拖放、从剪贴板粘贴或选择文件。支持 PNG、JPG、WEBP、GIF 和 SVG 格式。",
      howTitle: "如何解码二维码",
      step1: "拖放、粘贴或选择包含二维码的图片。",
      step2: "二维码将在您的浏览器中被即时识别并解码。",
      step3: "一键复制结果或打开链接。",
      aboutTitle: "什么是在线二维码识别器？",
      aboutText: "在线二维码识别器让您无需用相机扫描，即可从图片文件中读取二维码内容。QR Decoder 可识别网址、Wi-Fi 信息、电子邮箱、电话号码、联系人名片（vCard）、日程和纯文本，全部在浏览器中完成，您的图片始终保持私密。",
      faqTitle: "常见问题",
      faq1Q: "QR Decoder 是免费的吗？",
      faq1A: "是的。完全免费，无需注册或安装。",
      faq2Q: "我的图片会被上传到服务器吗？",
      faq2A: "不会。所有解码都在您的浏览器本地完成，图片不会离开您的设备。",
      faq3Q: "支持哪些文件格式？",
      faq3A: "支持 PNG、JPG、WEBP、GIF 和 SVG 图片。",
      faq4Q: "可以识别截图中的二维码吗？",
      faq4A: "可以。复制截图后用 Ctrl/⌘ + V 粘贴，或直接上传图片文件。",
      faq5Q: "支持哪些语言？",
      faq5A: "界面提供英语、韩语、中文和日语。",
    },
    ja: {
      _name: "日本語",
      subtitle: "画像をドラッグ＆ドロップするか、クリックしてQRコード画像をアップロードしてください。",
      dzTitle: "QR画像をここにドラッグ＆ドロップ",
      dzSub: 'または <span class="dz-link">クリックしてファイルを選択</span> · <kbd>Ctrl/⌘</kbd> + <kbd>V</kbd> で貼り付け',
      dropHere: "ここにドロップ",
      previewLabel: "プレビュー",
      clear: "クリア",
      footer: "すべての処理はブラウザ内で行われます · 画像がサーバーに送信されることはありません",
      dropzoneAria: "QR画像アップロード領域。ファイルをドラッグ＆ドロップするか、クリックして選択してください。",
      successTitle: "デコード完了",
      errorTitle: "QRコードが見つかりませんでした",
      copy: "コピー",
      copied: "コピーしました！",
      openLink: "リンクを開く",
      chars: "文字",
      bytes: "バイト",
      version: "バージョン",
      errNoLib: "デコードライブラリを読み込めませんでした。接続を確認して再読み込みしてください。",
      errNoQR: "画像からQRコードを認識できませんでした。より鮮明で、QRがはっきり見える画像をお試しください。",
      errLoadImg: "画像を読み込めません。別のファイルをお試しください。",
      errOnlyImg: "画像ファイルのみ対応しています。",
      errReadFile: "ファイルの読み込み中にエラーが発生しました。",
      type_url: "URL", type_wifi: "Wi-Fi", type_email: "メール", type_tel: "電話",
      type_vcard: "連絡先", type_event: "予定", type_scheme: "リンク", type_json: "JSON", type_text: "テキスト",
      featuresTitle: "QR Decoder を選ぶ理由",
      feat1Title: "100% プライベート",
      feat1Desc: "画像はすべてブラウザ内で処理され、サーバーにアップロードされることは一切ありません。",
      feat2Title: "即時 ・ 無料",
      feat2Desc: "登録不要・制限なし。1秒でQRコードを無料でデコードします。",
      feat3Title: "あらゆる画像",
      feat3Desc: "ドラッグ＆ドロップ、クリップボードから貼り付け、ファイル選択に対応。PNG・JPG・WEBP・GIF・SVG形式をサポートします。",
      howTitle: "QRコードのデコード方法",
      step1: "QRコードを含む画像をドロップ・貼り付け・選択します。",
      step2: "ブラウザ内でQRコードが即座に認識・デコードされます。",
      step3: "結果をコピーするか、ワンクリックでリンクを開きます。",
      aboutTitle: "オンラインQRコードリーダーとは？",
      aboutText: "オンラインQRコードリーダーは、カメラでスキャンする代わりに画像ファイルからQRコードの内容を読み取るツールです。QR Decoder はURL、Wi-Fi情報、メールアドレス、電話番号、連絡先（vCard）、予定、テキストを認識し、すべてブラウザ内で処理するため画像は外部に送信されません。",
      faqTitle: "よくある質問",
      faq1Q: "QR Decoder は無料で使えますか？",
      faq1A: "はい。アカウント登録やインストール不要で、完全に無料です。",
      faq2Q: "画像はサーバーにアップロードされますか？",
      faq2A: "いいえ。すべてのデコードはブラウザ内で行われるため、画像が端末外に出ることはありません。",
      faq3Q: "対応している画像形式は？",
      faq3A: "PNG・JPG・WEBP・GIF・SVG の画像に対応しています。",
      faq4Q: "スクリーンショットのQRコードも読めますか？",
      faq4A: "はい。スクリーンショットをコピーして Ctrl/⌘ + V で貼り付けるか、画像ファイルを直接アップロードしてください。",
      faq5Q: "対応言語は？",
      faq5A: "インターフェースは英語・韓国語・中国語・日本語に対応しています。",
    },
  };

  // Fall back to Korean strings (the authored default) for any missing key.
  let currentLang = "ko";
  const t = (key) => (I18N[currentLang] && I18N[currentLang][key]) || I18N.ko[key] || "";

  // Remember the last render so we can re-localize it on language change.
  let lastRender = null; // { kind: "success", code } | { kind: "error", key }

  function applyStaticTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.getAttribute("data-i18n-attr").split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });
  }

  function setLanguage(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang;
    langLabel.textContent = I18N[lang]._name;
    applyStaticTranslations();

    langMenu.querySelectorAll(".lang-option").forEach((opt) => {
      const active = opt.getAttribute("data-lang") === lang;
      opt.classList.toggle("active", active);
      opt.setAttribute("aria-selected", active ? "true" : "false");
    });

    if (lastRender && lastRender.kind === "success") renderSuccess(lastRender.code);
    else if (lastRender && lastRender.kind === "error") renderError(lastRender.key);
  }

  // ---- Utilities ---------------------------------------------------------

  const escapeHtml = (str) =>
    str.replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));

  const isUrl = (str) => /^(https?:\/\/|www\.)[^\s]+$/i.test(str.trim());

  // Detect the semantic type of a decoded QR payload. Returns a type key;
  // the human-readable label is resolved through the active language.
  function detectType(text) {
    const s = text.trim();
    if (/^https?:\/\//i.test(s) || /^www\./i.test(s)) return "url";
    if (/^WIFI:/i.test(s)) return "wifi";
    if (/^mailto:/i.test(s) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return "email";
    if (/^tel:/i.test(s) || /^\+?\d[\d\s-]{6,}$/.test(s)) return "tel";
    if (/^BEGIN:VCARD/i.test(s)) return "vcard";
    if (/^BEGIN:VEVENT/i.test(s) || /^BEGIN:VCALENDAR/i.test(s)) return "event";
    if (/^(bitcoin|ethereum|geo|sms|smsto):/i.test(s)) return "scheme";
    if (/^\{[\s\S]*\}$/.test(s) || /^\[[\s\S]*\]$/.test(s)) return "json";
    return "text";
  }

  // ---- Rendering ---------------------------------------------------------

  function renderSuccess(code) {
    lastRender = { kind: "success", code };
    const value = code.data;
    const typeKey = detectType(value);
    const byteLen = new TextEncoder().encode(value).length;

    let valueHtml;
    if (typeKey === "url") {
      const href = /^www\./i.test(value.trim()) ? "http://" + value.trim() : value.trim();
      valueHtml = `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(value)}</a>`;
    } else {
      valueHtml = escapeHtml(value);
    }

    const openBtn =
      typeKey === "url"
        ? `<a class="action-btn btn-open" href="${escapeHtml(/^www\./i.test(value.trim()) ? "http://" + value.trim() : value.trim())}" target="_blank" rel="noopener noreferrer">
             <svg viewBox="0 0 24 24" fill="none"><path d="M14 4h6v6M20 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
             ${t("openLink")}
           </a>`
        : "";

    result.innerHTML = `
      <div class="result-card">
        <div class="result-head">
          <span class="status-dot"></span>
          <span class="result-title">${t("successTitle")}</span>
          <span class="type-badge">${t("type_" + typeKey)}</span>
        </div>
        <div class="result-body">
          <div class="decoded-value" id="decodedValue">${valueHtml}</div>
          <div class="result-actions">
            <button class="action-btn btn-copy" id="copyBtn" type="button">
              <svg viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
              <span>${t("copy")}</span>
            </button>
            ${openBtn}
          </div>
          <div class="meta-row">
            <span><strong>${value.length}</strong> ${t("chars")}</span>
            <span><strong>${byteLen}</strong> ${t("bytes")}</span>
            <span>${t("version")} <strong>${code.version ?? "-"}</strong></span>
          </div>
        </div>
      </div>`;

    document.getElementById("copyBtn").addEventListener("click", (e) => copyToClipboard(value, e.currentTarget));
  }

  function renderError(messageKey) {
    lastRender = { kind: "error", key: messageKey };
    result.innerHTML = `
      <div class="result-card error">
        <div class="result-head">
          <span class="status-dot"></span>
          <span class="result-title">${t("errorTitle")}</span>
        </div>
        <div class="result-body">
          <p class="error-msg">${escapeHtml(t(messageKey))}</p>
        </div>
      </div>`;
  }

  async function copyToClipboard(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    const label = btn.querySelector("span");
    const original = label.textContent;
    btn.classList.add("copied");
    label.textContent = t("copied");
    setTimeout(() => {
      btn.classList.remove("copied");
      label.textContent = original;
    }, 1600);
  }

  // ---- Decoding ----------------------------------------------------------

  function decodeImage(img) {
    const maxDim = 1400;
    let { naturalWidth: w, naturalHeight: h } = img;
    const scale = Math.min(1, maxDim / Math.max(w, h));
    w = Math.round(w * scale);
    h = Math.round(h * scale);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);

    const imageData = ctx.getImageData(0, 0, w, h);
    let code = window.jsQR(imageData.data, w, h, { inversionAttempts: "attemptBoth" });

    // Retry with a light contrast boost if the first pass fails.
    if (!code) {
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (d[i] + d[i + 1] + d[i + 2]) / 3;
        const nv = v > 128 ? 255 : 0;
        d[i] = d[i + 1] = d[i + 2] = nv;
      }
      code = window.jsQR(d, w, h, { inversionAttempts: "attemptBoth" });
    }

    return code;
  }

  function handleImageSource(src) {
    const img = new Image();
    img.onload = () => {
      previewImg.src = src;
      preview.hidden = false;

      if (typeof window.jsQR !== "function") {
        renderError("errNoLib");
        return;
      }

      const code = decodeImage(img);
      if (code && code.data) {
        renderSuccess(code);
      } else {
        renderError("errNoQR");
      }
    };
    img.onerror = () => renderError("errLoadImg");
    img.src = src;
  }

  function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      renderError("errOnlyImg");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => handleImageSource(e.target.result);
    reader.onerror = () => renderError("errReadFile");
    reader.readAsDataURL(file);
  }

  function reset() {
    preview.hidden = true;
    previewImg.src = "";
    result.innerHTML = "";
    fileInput.value = "";
    lastRender = null;
  }

  // ---- Language dropdown -------------------------------------------------

  function openLangMenu() {
    langMenu.hidden = false;
    langSwitcher.classList.add("open");
    langBtn.setAttribute("aria-expanded", "true");
  }
  function closeLangMenu() {
    langMenu.hidden = true;
    langSwitcher.classList.remove("open");
    langBtn.setAttribute("aria-expanded", "false");
  }

  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (langMenu.hidden) openLangMenu();
    else closeLangMenu();
  });

  langMenu.addEventListener("click", (e) => {
    const option = e.target.closest(".lang-option");
    if (!option) return;
    setLanguage(option.getAttribute("data-lang"));
    closeLangMenu();
  });

  document.addEventListener("click", (e) => {
    if (!langSwitcher.contains(e.target)) closeLangMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLangMenu();
  });

  // ---- Events ------------------------------------------------------------

  dropzone.addEventListener("click", () => fileInput.click());
  dropzone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInput.click();
    }
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  });

  ["dragenter", "dragover"].forEach((evt) =>
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add("dragover");
    })
  );
  ["dragleave", "drop"].forEach((evt) =>
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (evt === "dragleave" && dropzone.contains(e.relatedTarget)) return;
      dropzone.classList.remove("dragover");
    })
  );
  dropzone.addEventListener("drop", (e) => {
    const dt = e.dataTransfer;
    if (dt.files && dt.files[0]) {
      handleFile(dt.files[0]);
      return;
    }
    // Dragged image element or URL.
    const url = dt.getData("text/uri-list") || dt.getData("text/plain");
    if (url && /^https?:\/\//i.test(url)) handleImageSource(url);
  });

  // Paste an image from clipboard anywhere on the page.
  window.addEventListener("paste", (e) => {
    const items = e.clipboardData && e.clipboardData.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        handleFile(item.getAsFile());
        e.preventDefault();
        return;
      }
    }
  });

  clearBtn.addEventListener("click", reset);

  // Prevent the browser from opening dropped files outside the dropzone.
  window.addEventListener("dragover", (e) => e.preventDefault());
  window.addEventListener("drop", (e) => e.preventDefault());

  // Default language.
  setLanguage("en");
})();
