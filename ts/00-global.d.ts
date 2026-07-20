// ══════════════════════════════════════════════════════════════════════════
// GLOBAL TYPE DECLARATIONS
// This file adds no runtime code. It only widens TypeScript's built-in DOM
// types so that this legacy, previously-untyped codebase type-checks without
// having to rewrite working logic. Every property this file adds resolves to
// `any`, matching the original code's untyped JavaScript behavior exactly.
// ══════════════════════════════════════════════════════════════════════════

export {};

declare global {
  // The app freely attaches ad-hoc helper functions/state to `window`
  // (e.g. window.haptic, window._schedFilter, window.cmState, ...).
  interface Window {
    [key: string]: any;
  }

  // Code frequently narrows `document.getElementById()` / `querySelector()`
  // results (typed as the general `Element`) straight into `.value`,
  // `.style`, `.dataset`, etc. without an explicit cast. An index signature
  // lets those existing access patterns keep working unchanged.
  interface Element {
    [key: string]: any;
  }

  interface EventTarget {
    [key: string]: any;
  }

  // These are defined in sibling <script> files as `window.NAME = ...`
  // (property assignment) rather than a top-level `function`/`var`
  // declaration, so TypeScript's script-mode global scope can't see them
  // automatically. Declaring them here just tells the type checker they
  // exist; it has no effect on the emitted JavaScript.
  var BS_DATA: any;
  var _fFail: any;
  var aMat: any;
  var calcBsAge: any;
  var checkHabitReminders: any;
  var dcRender: any;
  var dcShowConfirm: any;
  var famAttachListener: any;
  var famEnsureAuth: any;
  var famLocal: any;
  var famShowConflict: any;
  var firebase: any;
  var haptic: any;
  var lockCloseSetupSheet: any;
  var lockOpenSetupSheet: any;
  var lockTryBiometric: any;
  var notesAddTag: any;
  var notesFmt: any;
  var notesOpen: any;
  var notesRemoveTag: any;
  var ntSwitchSeg: any;
  var profileSaveName: any;
  var renderPairSection: any;
  var searchRun: any;
  var selectEvCat: any;
  var taskOpen: any;
  var updateGoogleUI: any;
  var updateToolbarState: any;
  var vikramCloudSync: any;
  var vikramToast: any;

  interface Navigator {
    standalone?: boolean;
  }

  interface Credential {
    rawId?: any;
  }
}
