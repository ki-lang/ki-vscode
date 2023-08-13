
import * as vs from 'vscode';
import * as lsp from 'vscode-languageserver-protocol';
import * as lc from 'vscode-languageclient';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: vs.ExtensionContext) {

	let outputChannel = vs.window.createOutputChannel("Ki Language Server");

	const cmd = "ki";
	const serverOptions: ServerOptions = {
		run: {
			command: cmd,
			transport: TransportKind.stdio,
			args: ['ls', 'start']
		},
		debug: {
			command: cmd,
			transport: TransportKind.stdio,
			args: ['ls', 'start']
		}
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'ki' }],
		outputChannel: outputChannel,
		traceOutputChannel: outputChannel
	};

	client = new LanguageClient(
		'kiLanguageServer',
		'Ki Language Server',
		serverOptions,
		clientOptions
	);

	client.start();

	// context.subscriptions.push(vs.languages.registerDefinitionProvider({ scheme: "file", language: "ki", pattern: "**/*.{ki,kh}" }, {
	// 	provideDefinition(document, position, token): vs.ProviderResult<vs.Definition> {
	// 		vs.window.showInformationMessage(
	// 			`File: ${document.uri.path}; Line: ${position.line}; Character: ${position.character}`
	// 		);
	// 		return client.sendRequest("textDocument/definition", {
	// 			textDocument: document,
	// 			position: position,
	// 		}, token);
	// 	}
	// }));

	// context.subscriptions.push(vs.languages.registerHoverProvider({ scheme: "file", language: "ki", pattern: "**/*.{ki,kh}" }, {
	// 	provideHover(document, position, token): vs.ProviderResult<vs.Hover> {
	// 		vs.window.showInformationMessage(
	// 			`File: ${document.uri.path}; Line: ${position.line}; Character: ${position.character}`
	// 		);
	// 		return client.sendRequest("textDocument/hover", {
	// 			textDocument: document,
	// 			position: position,
	// 		}, token);
	// 	}
	// }));
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
