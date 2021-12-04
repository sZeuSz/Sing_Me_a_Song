/* eslint-disable import/extensions */
import '../setup/setup.js';
import app from '../app.js';

app.listen(process.env.PORT, () => {
  // console.log(`running in port ${process.env.PORT}`);
});
