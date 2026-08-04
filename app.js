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
