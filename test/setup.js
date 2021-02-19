const Logger = require('../services/logger.service')

jest.mock("../services/logger.service");

Logger.debug.mockImplementation((message, meta = "") => {
  console.log("debug", message, meta)
});

Logger.info.mockImplementation((message, meta = "") => {
  console.log("info", message, meta)
});

Logger.warn.mockImplementation((message, meta = "") => {
  console.log("warn", message, meta)
});

Logger.error.mockImplementation((message, meta = "") => {
  console.log("error", message, meta)
});