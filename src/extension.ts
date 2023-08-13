
import { workspace, ExtensionContext, window, commands } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {

	let disposable = commands.registerCommand('ki-vscode.activate', () => {
		window.showInformationMessage('Starting language server');
	});

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const cmd = "ki lsp start";
	const serverOptions: ServerOptions = {
		run: {
			command: cmd,
			transport: TransportKind.stdio
		},
		debug: {
			command: cmd,
			transport: TransportKind.stdio,
		}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'ki' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'kiLanguageServer',
		'Ki Language Server',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
