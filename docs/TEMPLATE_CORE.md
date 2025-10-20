# TEMPLATE_CORE — Implementasi Lengkap Core Templating (Project SaaS-Boilerplate)

Dokumen ini menjelaskan secara konkrit dan komprehensif bagaimana project ini mengimplementasikan (atau menyiapkan) konsep-konsep inti templating:

- Template Engine Abstraction
- Layout & Partial (Template Inheritance)
- Area / Region
- Theme System (folder-based partial demo + Tailwind dark mode support)

Setiap bagian dilengkapi dengan:
- Penjelasan ringkas konsep
- File/lokasi di project yang relevan
- Contoh pemakaian yang konkret
- Catatan implementasi & batasan saat ini

Tujuan: memudahkan pengembang lain memahami di mana dan bagaimana menambah/menyesuaikan templating di project ini.

---

## Ringkasan singkat kondisi saat ini
Project `SaaS-Boilerplate` adalah aplikasi Next.js (App Router) yang menggunakan React/TSX untuk templating. Karena itu:
- Struktur "template" berwujud komponen React dan Next.js layouts (bukan engine template berbasis string seperti EJS/Handlebars untuk seluruh view).
- Saya menambahkan beberapa modul kecil agar konsep templating klasik dapat diadopsi: area manager (plugin), template engine abstraction (render string adapter), dan demo theme folder-based untuk partial (Header).
- Semua perubahan telah diuji dengan `npm run build` dan lulus.

---

## 1) Template Engine Abstraction
Tujuan
- Menyediakan lapisan abstraksi sehingga kita bisa menukar atau menambahkan engine template (mis. Handlebars/EJS/Pug) untuk merender string-template (server-side utility) tanpa menyebar perubahan ke seluruh codebase.

File utama
- `src/core/templateEngine.ts` — abstraksi utama (API minimal):
  - `useTemplateEngine(engine)` — daftarkan engine adapter
  - `renderString(template, data)` — panggil engine untuk merender string

- `src/core/templateEngines/handlebarsAdapter.ts` — contoh adapter menggunakan `handlebars`.
  - Implementasi: compile & render template string lewat Handlebars.

- `src/core/templateEngineDemo.ts` — contoh registrasi adapter dan helper `renderDemo()` yang merender template demo.

Contoh penggunaan (konkrit)
- Server helper (contoh di code):
  - import `renderDemo` dan jalankan: `renderDemo({ name: 'Budi', count: 5 })` -> hasil HTML string dari Handlebars.

Batasan & catatan
- Abstraksi ini fokus pada "string rendering" (server-side). Project utama tetap memakai React untuk rendering halaman utuh.
- Untuk mengganti engine render seluruh halaman (mis. agar Next.js merender .ejs sebagai page), diperlukan integrasi SSR yang lebih dalam — bukan hanya utilitas ini.

---

## 2) Layout & Partial (Template Inheritance)
Tujuan
- Menetapkan struktur halaman (layout) dan partial yang dapat dipakai ulang (navbar, footer, logo, dsb.) tanpa mengubah logika backend.

Implementasi di project
- Next.js App Router layouts (file-based)
  - `src/app/[locale]/layout.tsx` — root layout (HTML skeleton, Intl provider, wrapper untuk content)
  - `src/app/[locale]/(auth)/layout.tsx` — layout untuk routes authenticated
  - `src/app/[locale]/(auth)/dashboard/layout.tsx` — layout dashboard

- Partial / reusable components
  - `src/templates/Navbar.tsx`
  - `src/templates/Footer.tsx`
  - `src/templates/Logo.tsx`
  - `src/templates/CTA.tsx`
  - `src/components/ThemeHeader.tsx` (client-side theme header loader)

Contoh implementasi
- `layout.tsx` membungkus children dengan `NextIntlClientProvider` dan struktur HTML. Partial seperti `Navbar`/`Footer` di-includekan pada tempatnya sebagai komponen React. Ini setara dengan `layout + include('partials/navbar')` pada templating tradisional.

Keuntungan
- Mengganti partial (mis. Navbar) cukup dengan mengganti komponen React terkait.
- Lebih aman, reusable, dan memanfaatkan TypeScript + React composition.

---

## 3) Area / Region
Tujuan
- Menyediakan cara bagi modul/plugin terpisah untuk mendaftarkan potongan UI ke area tertentu di layout (mis. `sidebar`) tanpa mengubah file layout.

Implementasi (konkrit)
- `src/core/areaManager.ts` — API:
  - `registerToArea(area: string, component: AreaComponent)` — register komponen/widget ke area
  - `getAreaComponents(area: string): AreaComponent[]` — ambil daftar komponen yang terdaftar
  - `clearAreas()` — bersihkan pendaftaran (berguna untuk testing)

- `src/core/bootstrap.ts` — file yang di-import di `layout.tsx` untuk memuat plugin (side-effect import). Tambahkan plugin lain di file ini untuk mendaftar.

- `src/plugins/recent-posts/index.tsx` — contoh plugin yang mendaftarkan widget sederhana ke area `sidebar`:
  - Di-import oleh `bootstrap.ts`, memanggil `registerToArea('sidebar', { id: 'recent-posts', render: () => <RecentPostsWidget/> })`.

- `src/app/[locale]/layout.tsx` — saya perbarui layout agar memanggil `getAreaComponents('sidebar')` dan merender hasilnya di `<aside>`.

Contoh alur (konkrit)
1. `bootstrap.ts` import `src/plugins/recent-posts`.
2. Saat module di-evaluasi, `recent-posts` memanggil `registerToArea('sidebar', ...)`.
3. `layout.tsx` memanggil `getAreaComponents('sidebar')` dan merender widget-widget terdaftar.

Peningkatan yang bisa dibuat
- Support prioritas/ordering (mis. `priority` field), konfigurasi enable/disable plugin lewat `AppConfig`, lazy-loading plugin dengan dynamic import, dan lifecycle hooks (onMount/onUnmount).

---

## 4) Theme System (folder-based partial demo + Tailwind dark mode)
Tujuan
- Menunjukkan cara mengganti partial/layout/style berdasarkan tema aktif. Ada dua lapisan:
  - Styling: Tailwind + `next-themes` (sudah ada) untuk dark/light
  - View/partial swapping: folder-based demo (`src/themes/<theme>/...`) untuk mengganti komponen partial

Implementasi (konkrit)
- Config tema:
  - `src/utils/AppConfig.ts` — properti `theme: 'default'` (nilai default dapat diubah untuk mengganti tema global di demo ini)

- Partial folder-based (demo) — contoh header:
  - `src/themes/default/Header.tsx` — DefaultTheme header component
  - `src/themes/dark/Header.tsx` — DarkTheme header component

- Loader client-side:
  - `src/components/ThemeHeader.tsx` — client component yang memanggil dynamic import untuk `src/themes/<AppConfig.theme>/Header`.
  - Pada `src/app/[locale]/layout.tsx` saya menambahkan `<ThemeHeader />` sehingga header disuplai dari folder tema aktif.

Catatan teknis
- File-level layout swapping (mis. mengganti `src/app/[locale]/layout.tsx` secara keseluruhan berdasarkan tema) sulit dilakukan hanya dengan dynamic import karena Next.js App Router mengandalkan file-based routing dan SSR. Pilihan realistik:
  - Component-level swap (yang sudah saya implementasikan) — sangat cocok untuk header/footer/cards.
  - Untuk layout-level swap: perlu strategi build-time (generate route layout per theme) atau deploy terpisah per tema.

Runtime switch
- Saat ini `AppConfig.theme` adalah konfigurasi statis (build-time demo). Untuk switch runtime (user memilih tema), Anda dapat:
  - Gunakan `next-themes` untuk style + CSS vars untuk perubahan warna; dan
  - Lakukan dynamic import dari `ThemeHeader` berdasarkan state client (mis. context) alih-alih `AppConfig.theme` statis.

---

## File map lengkap (lokasi implementasi saat ini)
- Abstraksi template engine
  - `src/core/templateEngine.ts`
  - `src/core/templateEngines/handlebarsAdapter.ts`
  - `src/core/templateEngineDemo.ts`

- Area / plugin
  - `src/core/areaManager.ts`
  - `src/core/bootstrap.ts`
  - `src/plugins/recent-posts/index.tsx`
  - `src/app/[locale]/layout.tsx` (render area `sidebar`)

- Theming (partial folder demo)
  - `src/utils/AppConfig.ts` (tambah `theme`)
  - `src/themes/default/Header.tsx`
  - `src/themes/dark/Header.tsx`
  - `src/components/ThemeHeader.tsx` (client loader)
  - `src/app/[locale]/layout.tsx` (render ThemeHeader)

- Layout & partials
  - `src/app/[locale]/layout.tsx`
  - `src/app/[locale]/(auth)/layout.tsx`
  - `src/app/[locale]/(auth)/dashboard/layout.tsx`
  - `src/templates/*` (Navbar, Footer, Logo, CTA)

---

## Contoh praktis dan petunjuk step-by-step

1) Menambah plugin baru yang tampil di `sidebar`
- Buat file: `src/plugins/my-widget/index.tsx`
  ```tsx
  import React from 'react';

  import { registerToArea } from '@/core/areaManager';

  function MyWidget(){
    return <div className="rounded-md border p-3">My Widget</div>;
  }

  registerToArea('sidebar', { id: 'my-widget', render: () => <MyWidget/>  });

  export default MyWidget;
  ```
- Tambahkan import ke `src/core/bootstrap.ts`:
  ```ts
  import '@/plugins/my-widget';
  ```
- Jalankan dev/build: plugin akan muncul di `sidebar` tanpa modifikasi `layout.tsx`.

2) Menggunakan template engine adapter (Handebars) untuk merender string server-side
- Import demo:
  ```ts
  import renderDemo from '@/core/templateEngineDemo';
  const html = renderDemo({ name: 'Siti', count: 7 });
  console.log(html);
  ```
- Kegunaan nyata: membuat email templates, snippet HTML untuk notifikasi, atau migrasi sebagian content rendering dari string templates.

3) Mengganti theme demo (partial-level)
- Ubah nilai `theme` di `src/utils/AppConfig.ts` dari `'default'` ke `'dark'` lalu jalankan dev/build.
- Hasil: `ThemeHeader` akan memuat `src/themes/dark/Header.tsx`.

---

## Rencana pengembangan lanjutan (opsional)
Berikut beberapa peningkatan yang bisa saya implementasikan jika Anda mau:
1. Area Manager: prioritas/ordering, lazy-load plugins, enable/disable config.
2. Runtime theme switcher: client-side theme toggle + dynamic imports based on state.
3. Folder-based layout swap (layout-level): butuh build-time strategy — saya bisa jelaskan dua pendekatan (multi-build vs codegen).
4. Template engine integration ke route/SSR (full page render using EJS/Handlebars): memerlukan modifikasi SSR pipeline.

---

Jika Anda mau, saya lanjutkan untuk mengimplementasikan (sebutkan nomor 1/2/3/4), atau saya bisa membuat PR terpisah yang menambahkan fitur-fitur tersebut lengkap dengan unit tests dan README.

Terima kasih — beri tahu saya langkah mana yang mau Anda prioritaskan.

# Core Templating Concepts — Penjelasan dan Lokasi di Project

Dokumen ini menjelaskan bagaimana project ini menerapkan (atau menyiapkan) core concept templating yang Anda minta: Template Engine Abstraction, Layout & Partial, Area/Region, dan Theme System. Semua penjelasan ditulis dalam Bahasa Indonesia dan menyertakan file/lokasi agar mudah dimengerti.

## Ringkasan Singkat
- Project ini menggunakan Next.js + React (JSX/TSX) sehingga "templating" dilakukan melalui komponen React dan layout Next.js.
- Saya menambahkan modul kecil untuk: area/region, theme helper, dan abstraksi template engine (dengan adapter Handlebars contoh) agar mudah diperluas.

---

## 1. Template Engine Abstraction
Tujuan: menyediakan lapisan abstraksi agar kita bisa mengganti atau menambahkan template engine (mis. EJS/Handlebars/Pug) tanpa mengubah bagian aplikasi lain.

Lokasi terkait:
- `src/core/templateEngine.ts` — API abstraksi inti.
  - Fungsi: `useTemplateEngine(engine)` untuk mendaftarkan engine, dan `renderString(template, data)` untuk merender string template.
- `src/core/templateEngines/handlebarsAdapter.ts` — contoh adapter Handlebars.
- `src/core/templateEngineDemo.ts` — contoh cara mendaftarkan adapter dan merender string template.

Catatan implementasi:
- Karena Next.js + React menggunakan JSX/TSX, abstraksi ini dibuat sebagai utilitas server-side (render string). Jika Anda ingin mengubah seluruh view-engine (mis. render halaman .ejs), perlu pendekatan berbeda yang menyentuh pipeline SSR (server-side rendering) atau membuat route khusus yang merender template string.

Contoh penggunaan cepat (server-side utility):

```ts
import { renderDemo } from '@/core/templateEngineDemo';
const html = renderDemo({ name: 'Asep', count: 3 });
// html => '<h1>Hello Asep</h1><p>Count: 3</p>'
```

---

## 2. Layout & Partial (Template Inheritance)
Pada aplikasi ini, konsep layout/partial diimplementasikan secara idiomatik menggunakan Next.js App Router dan komponen React.

Lokasi utama:
- `src/app/[locale]/layout.tsx` — root layout untuk setiap locale.
- `src/app/[locale]/(auth)/layout.tsx`, `src/app/[locale]/(auth)/dashboard/layout.tsx` — sub-layouts khusus area auth/dashboard.
- Template/partial komponen:
  - `src/templates/Navbar.tsx`
  - `src/templates/Footer.tsx`
  - `src/templates/Logo.tsx`
  - `src/templates/CTA.tsx`

Penjelasan:
- `layout.tsx` menyediakan kerangka halaman (html/body dan NextIntl provider). Komponen seperti Navbar, Footer adalah partial yang dapat digunakan berulang di beberapa halaman.
- Keuntungan: jika Anda ingin mengganti struktur (mis. menukar Navbar), cukup ganti komponen tersebut tanpa mengubah business logic.

---

## 3. Area / Region
Tujuan: memungkinkan plugin/komponen lain mendaftar ke area tertentu pada layout (mis. sidebar) tanpa perlu mengubah layout langsung.

Implementasi yang saya tambahkan:
- `src/core/areaManager.ts` — manager area sederhana.
  - `registerToArea(area, component)` — registrasi komponen.
  - `getAreaComponents(area)` — ambil komponen terdaftar untuk dirender di layout.
  - `clearAreas()` — bersihkan pendaftaran (bantu test).
- `src/core/bootstrap.ts` — import plugin agar pendaftaran berjalan saat aplikasi dimulai.
- `src/plugins/recent-posts/index.tsx` — contoh plugin yang mendaftar widget ke area `sidebar`.
- `src/app/[locale]/layout.tsx` — saya modifikasi untuk meng-import bootstrap dan merender area `sidebar` pada `<aside>`.

Contoh alur:
1. Plugin `recent-posts` di-import (melalui `bootstrap.ts`) saat server/client mulai.
2. Plugin memanggil `registerToArea('sidebar', { id, render })`.
3. Layout memanggil `getAreaComponents('sidebar')` dan merender widget-widget tersebut di sidebar.

Manfaat:
- Tambah plugin baru tanpa ubah layout.
- Plugin dapat diaktifkan atau dinonaktifkan hanya dengan meng-include/ekskludekan import di `bootstrap.ts`.

---

## 4. Theme System
Tujuan: mengizinkan pergantian tema (layout/style/partial) berdasarkan tema aktif.

Implementasi saat ini:
- Styling: project memakai Tailwind CSS dan `next-themes` sehingga dukungan dark/light mode ada (kelas CSS/tailwind digunakan di komponen).
- Saya menambahkan helper:
  - `src/core/themeManager.ts` — menyimpan nama tema aktif, `themedPath(basePath)` helper untuk meresolve path bertema.

Catatan:
- Saat ini belum ada folder-based theme swapping (mis. `themes/dark/layout.tsx` secara automatis menggantikan layout). Implementasi folder-based memerlukan pendekatan build-time atau dynamic import pada level layout (lebih rumit karena Next.js file-based routing).
- Rekomendasi pendekatan mudah: gunakan Theme context/CSS vars untuk mengganti style (saat ini proyek sudah mendukung dark mode). Jika perlu folder-based view swap, saya dapat menyiapkannya (lihat opsi di bagian rekomendasi di bawah).

---

## Di mana menerapkan core concept tersebut (mapping file)
Berikut peta file yang memetakan masing-masing core concept ke implementasi/posisi dalam project:

- Template Engine Abstraction
  - `src/core/templateEngine.ts` (abstraksi)
  - `src/core/templateEngines/handlebarsAdapter.ts` (contoh adapter)
  - `src/core/templateEngineDemo.ts` (contoh pemakaian)

- Layout & Partial
  - `src/app/[locale]/layout.tsx` (root layout)
  - `src/app/[locale]/(auth)/layout.tsx` (auth layout)
  - `src/app/[locale]/(auth)/dashboard/layout.tsx` (dashboard layout)
  - `src/templates/*` (Navbar, Footer, Logo, CTA) — partials

- Area / Region
  - `src/core/areaManager.ts` (API register/get)
  - `src/core/bootstrap.ts` (load plugin)
  - `src/plugins/recent-posts/index.tsx` (contoh plugin)
  - `src/app/[locale]/layout.tsx` (render area sidebar)

- Theme System
  - `src/core/themeManager.ts` (nama tema + helper)
  - CSS & util: Tailwind config (`tailwind.config.ts`) dan `next-themes` pada project (dipakai secara implisit di layout/components)

---

## Contoh Penggunaan (bagian kode) — ringkas
1. Menambah plugin baru:
   - Buat file `src/plugins/my-widget/index.tsx` dan panggil `registerToArea('sidebar', { id: 'my-widget', render: () => <MyWidget/> })`.
   - Tambah import ke `src/core/bootstrap.ts`.
   - Build & reload — widget akan tampil pada area `sidebar`.

2. Render template string dengan adapter Handlebars (server-side helper):

```ts
import { renderDemo } from '@/core/templateEngineDemo';
console.log(renderDemo({ name: 'Budi', count: 5 }));
```

---

## Rekomendasi & Next Steps
- Jika ingin folder-based theme swapping (views/partials di `themes/<name>/...`), saya dapat:
  - Menambahkan struktur `src/themes/<theme>/...` dan resolver yang melakukan dynamic import berdasarkan `themeManager.getTheme()`.
  - Atau, gunakan compile-time approach: build terpisah untuk tiap tema.

- Untuk production area/plugin system:
  - Tambahkan prioritas/position ordering, lazy-loading, dan lifecycle hooks.
  - Pertimbangkan konfigurasi plugin (enable/disable) via AppConfig.

---

Jika Anda setuju, saya bisa melanjutkan dengan implementasi (folder-based theming) atau memperkaya `areaManager` (prioritas + unit tests). Pilih A (theming folder-based) atau B (area improvements) atau keduanya.
