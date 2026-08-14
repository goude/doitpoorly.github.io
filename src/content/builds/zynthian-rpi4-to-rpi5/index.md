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

<figure>
  <img src="/images/zynthian-rpi4-to-rpi5/teardown.avif" alt="Zynthian case opened, Pi 4 board exposed mid-teardown" width="1200" height="900" loading="lazy" />
  <figcaption>Teardown in progress — the Pi 4 comes out easier than it went in, four years ago.</figcaption>
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

<figure>
  <img src="/images/zynthian-rpi4-to-rpi5/reassembled.avif" alt="Zynthian case reassembled with the Pi 5 installed" width="1200" height="900" loading="lazy" />
  <figcaption>Back together. Boots in about a third of the time — most of that improvement is the NVMe HAT, not the CPU.</figcaption>
</figure>

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti. Full write-up with actual measurements — boot time, patch-load latency, thermals under a real set — <time datetime="2026-09-01">coming in September</time>, once it's been gigged a few times instead of just bench-tested.

[^cpu]: Raspberry Pi's own benchmarks put the Pi 5 at roughly 2–3× the Pi 4 on compute-bound tasks; real-world Zynthian latency gains are usually smaller and dominated by storage I/O, not CPU.
[^wiring]: Ask me how I know. Two of the four GPIO ribbon pins were one row off, and the failure mode was "boots fine, MIDI silently does nothing," which is the worst possible failure mode.
