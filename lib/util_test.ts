import { assertEquals } from "@std/assert";
import { cleanText } from "./util.ts";

Deno.test(function addTest() {
  assertEquals(cleanText("   hi   "), "hi");
  assertEquals(cleanText(" 1234'-.,_:;!\"$%&/()=?*^[]{}5"), "12345");
  assertEquals(cleanText("   hi ho   "), "hi ho");
  assertEquals(cleanText("   HI    HO   "), "HI    HO");
});
