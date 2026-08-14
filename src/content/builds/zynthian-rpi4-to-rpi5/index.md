---
title: "Zynthian: Raspberry Pi 4 → Pi 5 upgrade"
date: 2026-08-13
tags: [zynthian, raspberry-pi, synth]
cover: ./IMG_2039.avif
draft: true
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. The <abbr title="Zynthian">Zynthian</abbr> box has been running on a Pi 4 since it was built, and it shows: patch changes lag, the UI stutters under a full <mark>layer stack</mark>, and the fan spends more time audibly disagreeing with the CPU than actually cooling it. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — none of that is a Pi 5 problem, allegedly.

## Why the Pi 5

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. The short version[^cpu]: roughly double the single-core throughput, PCIe for a real NVMe HAT instead of limping along on a microSD card, and enough headroom to stop worrying about buffer underruns during a live set.

Everything that has to come apart is in <a class="figref" href="#fig-1">fig. 1</a>. The part that matters is <a class="anno-ref" href="#f1-m2">the ribbon bus<span class="anno-chip">2</span></a>: it carries the encoders and the display, and it is the only connection that has to be re-seated blind once the lid goes back on. The <a class="anno-ref" href="#f1-m5">HiFiBerry soundcard<span class="anno-chip">5</span></a> stays; <a class="anno-ref" href="#f1-m6">the old iQaudIO card<span class="anno-chip">6</span></a> does not.

<figure id="fig-1">
  <div class="anno-plate">
    <img src="/images/zynthian-rpi4-to-rpi5/teardown.avif" alt="Zynthian case opened on a workbench, Pi 4 board and two soundcards laid out beside it" width="2876" height="3835" loading="lazy" />
    <a class="anno-mark" id="f1-m1" href="#f1-k1" style="left: 45%; top: 47%">1<span class="anno-tip">Zynthian v4 front panel</span></a>
    <a class="anno-mark" id="f1-m2" href="#f1-k2" style="left: 53%; top: 27%">2<span class="anno-tip">GPIO ribbon</span></a>
    <a class="anno-mark" id="f1-m3" href="#f1-k3" style="left: 64%; top: 20%">3<span class="anno-tip">Encoder board</span></a>
    <a class="anno-mark" id="f1-m4" href="#f1-k4" style="left: 29%; top: 71%">4<span class="anno-tip">Pi 4, heatsink case</span></a>
    <a class="anno-mark" id="f1-m5" href="#f1-k5" style="left: 70%; top: 60%">5<span class="anno-tip">HiFiBerry DAC+ADC</span></a>
    <a class="anno-mark" id="f1-m6" href="#f1-k6" style="left: 72%; top: 81%">6<span class="anno-tip">iQaudIO Pi-DAC+</span></a>
  </div>
  <figcaption>
    <span class="fig-label">Fig. 1</span>Teardown in progress — the Pi 4 comes out easier than it went in, four years ago.
    <ol class="anno-key">
      <li id="f1-k1"><a href="#f1-m1"><span class="anno-num">1</span><span>Front panel <span class="anno-gloss">MIDI DIN, USB, headphone out</span></span></a></li>
      <li id="f1-k2"><a href="#f1-m2"><span class="anno-num">2</span><span>GPIO ribbon <span class="anno-gloss">encoders and display</span></span></a></li>
      <li id="f1-k3"><a href="#f1-m3"><span class="anno-num">3</span><span>Encoder board <span class="anno-gloss">screwed to the lid</span></span></a></li>
      <li id="f1-k4"><a href="#f1-m4"><span class="anno-num">4</span><span>Pi 4 <span class="anno-gloss">in its heatsink case, detail in fig. 3</span></span></a></li>
      <li id="f1-k5"><a href="#f1-m5"><span class="anno-num">5</span><span>HiFiBerry DAC+ADC <span class="anno-gloss">kept</span></span></a></li>
      <li id="f1-k6"><a href="#f1-m6"><span class="anno-num">6</span><span>iQaudIO Pi-DAC+ <span class="anno-gloss">retired</span></span></a></li>
    </ol>
  </figcaption>
</figure>

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Parts list

<dl>
  <dt>Board</dt>
  <dd>Raspberry Pi 5, 8&nbsp;GB</dd>
  <dt>Storage</dt>
  <dd>NVMe HAT + 256&nbsp;GB stick, replacing the microSD</dd>
  <dt>Cooling</dt>
  <dd>Active cooler, official</dd>
  <dt>Case</dt>
  <dd>Existing Zynthian acrylic stack — <em>should</em> still fit</dd>
</dl>

> Case compatibility is "probably fine," per three different forum threads and zero people who actually measured it. — a note I left myself, ignored, then had to revisit at 23:40 on a Thursday.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. The stack-up in <a class="figref" href="#fig-2">fig. 2</a> is where the case-compatibility question actually gets answered: <a class="anno-ref" href="#f2-mB">the 40-pin stacking header<span class="anno-chip">B</span></a> sets the height of everything above it, and <a class="anno-ref" href="#f2-mR">the clearance over the USB stack<span class="anno-chip">R</span></a> is what runs out first.

<figure id="fig-2">
  <div class="anno-plate">
    <img src="/images/zynthian-rpi4-to-rpi5/reassembled.avif" alt="Pi with soundcard seated, next to the heatsink case lid, stacking header, screws and hex key" width="2455" height="2454" loading="lazy" />
    <a class="anno-mark" id="f2-mA" href="#f2-kA" style="left: 28%; top: 61%">A<span class="anno-tip">Heatsink lid</span></a>
    <a class="anno-mark" id="f2-mC" href="#f2-kC" style="left: 13%; top: 89%">C<span class="anno-tip">Hex key + M2.5 screws</span></a>
    <a class="anno-mark" id="f2-mE" href="#f2-kE" style="left: 63%; top: 27%">E<span class="anno-tip">Retail box</span></a>
    <span class="anno-lead" style="right: 62%; top: 76%">
      <a class="anno-flag" id="f2-mB" href="#f2-kB"><b>B</b><span class="anno-flag-text">40-pin header</span></a>
      <span class="anno-rule" style="--len: 44px"></span>
    </span>
    <span class="anno-lead" style="right: 25%; top: 63%">
      <a class="anno-flag" id="f2-mD" href="#f2-kD"><b>D</b><span class="anno-flag-text">soundcard</span></a>
      <span class="anno-rule" style="--len: 34px"></span>
    </span>
    <span class="anno-region" id="f2-mR" style="left: 47%; top: 71%; width: 24%; height: 16%">
      <a class="anno-mark" href="#f2-kR">R<span class="anno-tip">2 mm clearance</span></a>
    </span>
  </div>
  <figcaption>
    <span class="fig-label">Fig. 2</span>Back together. Boots in about a third of the time — most of that improvement is the NVMe HAT, not the CPU.
    <ol class="anno-key">
      <li id="f2-kA"><a href="#f2-mA"><span class="anno-num">A</span><span>Heatsink lid <span class="anno-gloss">four M2.5 screws, no pad</span></span></a></li>
      <li id="f2-kB"><a href="#f2-mB"><span class="anno-num">B</span><span>Stacking header <span class="anno-gloss">11 mm, ordered wrong twice</span></span></a></li>
      <li id="f2-kC"><a href="#f2-mC"><span class="anno-num">C</span><span>Hex key and screws <span class="anno-gloss">supplied</span></span></a></li>
      <li id="f2-kD"><a href="#f2-mD"><span class="anno-num">D</span><span>Soundcard seated <span class="anno-gloss">3 mm higher than on the Pi 4</span></span></a></li>
      <li id="f2-kE"><a href="#f2-mE"><span class="anno-num">E</span><span>Retail box <span class="anno-gloss">"for the Pi 4", optimistically</span></span></a></li>
      <li id="f2-kR"><a href="#f2-mR"><span class="anno-num">R</span><span>Clearance zone <span class="anno-gloss">2 mm over the USB stack</span></span></a></li>
    </ol>
  </figcaption>
</figure>

## Gotchas

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. The GPIO header moved fractionally; nothing else did.

<details>
<summary>Full boot log excerpt (click to expand)</summary>

```
[    0.512301] brcmfmac: F1 signature read @0x18000000=0x15264345
[    1.203981] usb 1-1: new high-speed USB device number 2
[    2.884012] zynthian-ui: waiting for jackd...
[    3.010552] jackd: no message buffer overruns
```

Nothing alarming, but I stared at it for a while anyway, because that's the ritual.
</details>

Press <kbd>Ctrl</kbd>+<kbd>C</kbd> if `zynthian-ui` hangs on first boot — it usually doesn't, once the wiring's actually right[^wiring].

Cooling is the other unknown: the fan sits proud of the board by more than the old passive block did. <a class="figref" href="#fig-3">Fig. 3</a> is that corner at 2.5×: a crop of the same photograph, annotated in its own coordinates.

<figure id="fig-3">
  <div class="anno-plate" style="aspect-ratio: 16 / 9; overflow: hidden">
    <img src="/images/zynthian-rpi4-to-rpi5/teardown.avif" alt="Close crop of the Pi 4 in its heatsink case: fan, fan lead and Ethernet jack" width="2876" height="3835" loading="lazy" style="width: 250%; margin: -212% 0 0 -25%" />
    <span class="anno-region" style="left: 30%; top: 17%; width: 34%; height: 62%"></span>
    <span class="anno-lead" style="right: 28%; top: 85%">
      <span class="anno-flag">heatsink fins</span>
      <span class="anno-rule" style="--len: 28px"></span>
    </span>
    <a class="anno-mark" href="#f1-k4" style="left: 14%; top: 86%">4<span class="anno-tip">same part as fig. 1 · 4</span></a>
  </div>
  <figcaption>
    <span class="fig-label">Fig. 3 · detail 2.5×</span>Detail of <a href="#f1-m4">fig. 1 · 4</a>. The region marks the 40&nbsp;mm fan; the fins clear the case lid by about 2&nbsp;mm, which is the whole reason this photograph exists.
  </figcaption>
</figure>

## Pi 4 vs Pi 5, on paper

<table>
  <thead>
    <tr>
      <th scope="col">Spec</th>
      <th scope="col">Pi 4</th>
      <th scope="col">Pi 5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CPU</td>
      <td>Cortex-A72 @ 1.8 GHz</td>
      <td>Cortex-A76 @ 2.4 GHz</td>
    </tr>
    <tr>
      <td>Storage I/O</td>
      <td>microSD only</td>
      <td>PCIe 2.0 (NVMe HAT)</td>
    </tr>
    <tr>
      <td>Idle temp</td>
      <td>~48°C</td>
      <td>~41°C, active cooler</td>
    </tr>
  </tbody>
</table>

## Annotation vocabulary

Five marks, one contrast rule: a light face, a dark hairline, a white halo. Nothing relies on colour alone. Rouge is only ever the *linked-to* state.

<ul class="vocab">
  <li>
    <span class="swatch">
      <a class="anno-mark" href="#fig-1" style="left: 50%; top: 50%">7</a>
    </span>
    <b>Point, numbered</b>
    Sequence, order of operations, parts in a list.
  </li>
  <li>
    <span class="swatch pale">
      <a class="anno-mark" href="#fig-2" style="left: 50%; top: 50%">F</a>
    </span>
    <b>Point, lettered</b>
    Unordered sets, so numbers stay free for steps.
  </li>
  <li>
    <span class="swatch">
      <span class="anno-region" style="left: 22%; top: 22%; width: 56%; height: 56%"></span>
    </span>
    <b>Region</b>
    An area, a clearance, a crop shown elsewhere.
  </li>
  <li>
    <span class="swatch">
      <span class="anno-lead" style="left: 12%; top: 50%">
        <span class="anno-flag">named part</span>
        <span class="anno-rule" style="--len: 36px"></span>
      </span>
    </span>
    <b>Leader flag</b>
    When there is empty space and the name is short.
  </li>
  <li>
    <span class="swatch pale">
      <a class="anno-mark" href="#fig-1" style="left: 50%; top: 62%">2<span class="anno-tip" style="opacity: 1; translate: -50% 0">GPIO ribbon</span></a>
    </span>
    <b>Marker + tooltip</b>
    Hover, focus or link-target reveals the label.
  </li>
  <li>
    <span class="swatch pale" style="display: grid; place-items: center; background: var(--wash)">
      <a class="anno-ref" href="#f1-m2" style="font-size: 0.9375rem; font-style: normal">the ribbon bus<span class="anno-chip">2</span></a>
    </span>
    <b>Inline reference</b>
    In prose, links to the mark on the photograph.
  </li>
</ul>

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti. Full write-up with actual measurements — boot time, patch-load latency, thermals under a real set — <time datetime="2026-09-01">coming in September</time>, once it's been gigged a few times instead of just bench-tested.

[^cpu]: Raspberry Pi's own benchmarks put the Pi 5 at roughly 2–3× the Pi 4 on compute-bound tasks; real-world Zynthian latency gains are usually smaller and dominated by storage I/O, not CPU.
[^wiring]: Ask me how I know. Two of the four GPIO ribbon pins were one row off, and the failure mode was "boots fine, MIDI silently does nothing," which is the worst possible failure mode. The same vocabulary works at margin width: two dots, no tooltips, key omitted. <span class="anno-plate"><img src="/images/zynthian-rpi4-to-rpi5/reassembled.avif" alt="Thumbnail of the reassembled stack, header and lid marked" width="2455" height="2454" loading="lazy" /><a class="anno-mark" href="#f2-mB" style="left: 38%; top: 76%" aria-label="Stacking header">B</a><a class="anno-mark" href="#f2-mD" style="left: 68%; top: 63%" aria-label="Soundcard">D</a></span>
