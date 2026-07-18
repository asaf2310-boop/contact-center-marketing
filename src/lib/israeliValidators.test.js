import assert from "node:assert/strict";
import {
  getEmailError,
  getIsraeliPhoneError,
  phoneDigitsOnly,
} from "./israeliValidators.js";

assert.equal(phoneDigitsOnly("054-520-1499"), "0545201499");
assert.equal(getIsraeliPhoneError("0545201499", { required: true }), null);
assert.equal(getEmailError("test@example.com", { required: true }), null);
assert.ok(getIsraeliPhoneError("", { required: true }));

console.log("israeliValidators.test.js — OK");
