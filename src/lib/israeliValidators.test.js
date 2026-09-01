import assert from "node:assert/strict";
import {
  getEmailError,
  getIsraeliPhoneError,
  phoneDigitsOnly,
} from "./israeliValidators.js";

assert.equal(phoneDigitsOnly("050-267-7765"), "0502677765");
assert.equal(getIsraeliPhoneError("0502677765", { required: true }), null);
assert.equal(getEmailError("test@example.com", { required: true }), null);
assert.ok(getIsraeliPhoneError("", { required: true }));

console.log("israeliValidators.test.js — OK");
