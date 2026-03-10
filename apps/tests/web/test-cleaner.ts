import { WebBase } from '@test/web/web-base';
import { addAttach } from 'jest-html-reporters/helper';

export const cleanWebTest = async (webs: WebBase[], testFailed: boolean) => {
  const folderName = 'failures';

  for (const web of webs) {
    try {
      if (testFailed) {
        const screenshots = await web.saveScreenshots(folderName);

        for (const screenshot of screenshots) {
          await addAttach({
            attach: screenshot,
            description: 'Failure Screenshot'
          });
        }
      }
    } catch (err) {
      console.error('Failed capturing screenshots:', err);
    } finally {
      await web.close();
    }
  }
};
