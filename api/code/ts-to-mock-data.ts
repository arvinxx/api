import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Config } from 'ts-json-schema-generator/dist/src/Config';
import * as tsj from 'ts-json-schema-generator';

import type { Schema } from 'json-schema-faker';
import jsf from 'json-schema-faker';

import os from 'os';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { success } from '../_utils';

const tmpDir = os.tmpdir?.();

const tsToMockData = (req: VercelRequest, res: VercelResponse) => {
  const filePath = `${path.join(tmpDir, crypto.randomBytes(16).toString('hex'))}.ts`;

  try {
    fs.writeFileSync(filePath, req.body, {
      encoding: 'utf-8',
    });
    const config: Config = {
      path: filePath,
      expose: 'all',
      jsDoc: 'extended',
      type: '*',
    };

    const schema = tsj.createGenerator(config).createSchema(config.type);

    const data = Object.entries(schema.definitions!).map(([key, value]) => {
      const mockValue = jsf.generate(value as Schema);

      const mockValueStr = JSON.stringify(mockValue, null, 2);

      return `const ${key.toLowerCase()} = ${mockValueStr}`;
    });

    const mockStr = data.join('\n\n');
    res.send(success(mockStr));
    return mockStr;
  } catch (e) {
    res.status(500).send(e.message);
  }

  fs.unlinkSync(filePath);
  return '';
};

export default tsToMockData;
