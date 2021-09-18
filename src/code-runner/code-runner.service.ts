import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';


@Injectable()
export class CodeRunnerService {
  runCode(filename: string, args: string[]): Promise<string> {
    return this.runPythonCode(filename, args);
  }

  async runPythonCode(filename: string, args: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      const python = spawn('python3', [path.join('tmp', filename), ...args]);
      python.stdout.on('data', data => {
        resolve(data.toString());
      });

      python.stderr.on('data', data => {
        resolve(data.toString());
      });

      python.on('error', error => {
        reject(error.message);
      });

      python.on('close', code => {
        reject(code);
      });
    });
  }
}
