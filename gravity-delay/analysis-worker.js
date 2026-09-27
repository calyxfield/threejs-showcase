/* Dedicated worker: termination by the caller cancels the complete analysis. */
'use strict';

const assetVersion = new URL(self.location.href).searchParams.get('v') || '20260927b';
let loadError = null;
try {
  const query = '?v=' + encodeURIComponent(assetVersion);
  importScripts('physics.js' + query, 'analysis-core.js' + query);
} catch (error) {
  loadError = 'Unable to load sensitivity analysis: ' + (error.message || String(error));
}

self.onmessage = function ({ data }) {
  if (!data || data.type !== 'start') return;
  try {
    if (loadError) throw new Error(loadError);
    const result = self.GravityAnalysis.runAnalysis(data.settings, progress => {
      self.postMessage({ type: 'progress', ...progress });
    });
    self.postMessage({ type: 'complete', result });
  } catch (error) {
    self.postMessage({ type: 'error', message: error.message || String(error) });
  }
};
