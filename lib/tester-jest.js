'use babel';

/* @flow */
import type { TextEditor } from 'atom';
import * as jestRunner from './spawn-runner';

export function activate() {
  require('atom-package-deps').install();
}

export function deactivate() {
  // Fill something here, optional
}

export function provideTester() {
  return {
    name: 'tester-jest',
    options: {},
    scopes: atom.config.get('tester-jest.scopes'),
    test(textEditor :TextEditor) {
      if (!textEditor) {
        return Promise.resolve({ messages: [], output: '' });
      }
      const text = textEditor.getText();
      if (text.length === 0) {
        return Promise.resolve({ messages: [], output: '' });
      }
      // Note, a Promise may be returned as well!
      return jestRunner.run(textEditor);
    },
    stop() {
      jestRunner.stop();
    },
  };
}
