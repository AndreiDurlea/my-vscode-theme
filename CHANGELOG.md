# Changelog

## 1.3.7
- Show calls to library functions, such as `free` and `pthread_mutex_lock` in C, upright instead of italic, like other function calls.

## 1.3.6
- Run the extension on the local side in remote windows (SSH, WSL, Dev Containers), so the themes apply there without installing the extension on the remote host.

## 1.3.4
- Add the `deuterium.statusBarColor` setting. `accent` fills the status bar with the accent color; `background` gives it the editor background color.
- Show status bar and button text in black or white, whichever contrasts more with its background.

## 1.3.3
- Color classes and types `#33f3ff`, and interfaces, type parameters and decorators `#78dce8` italic.
- Separate function declarations `#a9dc76` from function calls `#99ffae`; both were `#abf29d`.
- Color parameters `#ffcfa8` italic, operators `#c0aaff`, variables and properties `#fcfcfa`, and punctuation and unscoped text `#939293`.
- Color tags and `true`, `false` and `null` with the keyword red `#f57385`.
- Adjust strings to `#fff48a`, numbers to `#c994ff` and comments to `#727072`.
- Use the same syntax colors as the Deuterium JetBrains plugin.

## 1.2.5
- Keep syntax colors fixed when an accent color is selected. The accent applies only to the status bar, buttons and progress bar.

## 1.2.4
- Add the Lush accent color `#9acd32`.

## 1.2.3
- Preview accent colors live while choosing one in the picker.
- Change Infrared to `#ff4e32` and Limelight to `#edf77a`.

## 1.2.2
- Show added lines in the gutter and minimap in gray `#868686` instead of lime `#adde00`.

## 1.2.1
- Make Infrared the default accent for Deuterium and Limelight the default for Deuterium Lite.

## 1.2.0
- Add accent colors, selected with the Select Accent Color command: Limelight, Infrared or a custom hex value.

## 1.1.0
- Rename the theme from Deutherium to Deuterium.
- Add Deuterium Lite, with a `#141414` editor background.
- Set JetBrains Mono, with fallbacks, as the default editor font and turn off bracket pair colorization.

## 1.0.0
- First release of the Deuterium theme, with a `#0d0d0d` editor background.
