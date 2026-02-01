import { test, expect, Page } from "@playwright/test";

// Helper to click the Saturday "Yes" radio button and wait for animation
async function selectSaturdayYes(page: Page) {
    await page.locator('input[name="attendingSaturday"][value="yes"]').click({ force: true });
    // Wait for Framer Motion animation
    await page.waitForTimeout(300);
}

// Helper to click the Saturday "No" radio button and wait for animation
async function selectSaturdayNo(page: Page) {
    await page.locator('input[name="attendingSaturday"][value="no"]').click({ force: true });
    await page.waitForTimeout(300);
}

// Helper to click the Friday "Yes" radio button and wait for animation
async function selectFridayYes(page: Page) {
    await page.locator('input[name="attendingFriday"][value="yes"]').click({ force: true });
    await page.waitForTimeout(300);
}

// Helper to click the Friday "No" radio button and wait for animation
async function selectFridayNo(page: Page) {
    await page.locator('input[name="attendingFriday"][value="no"]').click({ force: true });
    await page.waitForTimeout(300);
}

test.describe("RSVP Form", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        // Scroll to RSVP section and wait for form
        await page.locator("#rsvp").scrollIntoViewIfNeeded();
        await expect(page.locator("#rsvp form")).toBeVisible();
    });

    test.describe("Initial State", () => {
        test("shows name and email fields", async ({ page }) => {
            await expect(page.locator('input#name')).toBeVisible();
            await expect(page.locator('input#email')).toBeVisible();
        });

        test("shows Saturday attendance question", async ({ page }) => {
            // Check radio buttons for Saturday attendance exist
            await expect(page.locator('input[name="attendingSaturday"]')).toHaveCount(2);
        });

        test("does not show Friday question initially", async ({ page }) => {
            await expect(page.getByText("Kom je ook vrijdagavond 19 juni")).not.toBeVisible();
        });

        test("does not show camping options initially", async ({ page }) => {
            await expect(page.getByText("Wil je kamperen?")).not.toBeVisible();
        });

        test("does not show dietary field initially", async ({ page }) => {
            await expect(page.locator('input#dietary')).not.toBeVisible();
        });
    });

    test.describe("Required Field Validation", () => {
        test("requires name field", async ({ page }) => {
            await expect(page.locator('input#name')).toHaveAttribute("required", "");
        });

        test("requires email field", async ({ page }) => {
            await expect(page.locator('input#email')).toHaveAttribute("required", "");
        });

        test("requires Saturday attendance selection", async ({ page }) => {
            const yesRadio = page.locator('input[name="attendingSaturday"][value="yes"]');
            await expect(yesRadio).toHaveAttribute("required", "");
        });

        test("validates email format", async ({ page }) => {
            await expect(page.locator('input#email')).toHaveAttribute("type", "email");
        });
    });

    test.describe("Attending Saturday - Yes Flow", () => {
        test("shows Friday attendance question", async ({ page }) => {
            await selectSaturdayYes(page);
            // Check radio buttons for Friday attendance exist
            await expect(page.locator('input[name="attendingFriday"]')).toHaveCount(2);
        });

        test("shows camping options", async ({ page }) => {
            await selectSaturdayYes(page);
            await expect(page.getByText("Wil je kamperen?")).toBeVisible();
        });

        test("shows dietary field", async ({ page }) => {
            await selectSaturdayYes(page);
            await expect(page.locator('input#dietary')).toBeVisible();
        });

        test("shows only Saturday camping option when Friday not answered", async ({ page }) => {
            await selectSaturdayYes(page);
            await expect(page.locator('input#campingSatSun')).toBeVisible();
            await expect(page.locator('input#campingFriSat')).not.toBeVisible();
        });

        test("Saturday Yes radio is checked", async ({ page }) => {
            await selectSaturdayYes(page);
            await expect(page.locator('input[name="attendingSaturday"][value="yes"]')).toBeChecked();
        });
    });

    test.describe("Attending Saturday - No Flow", () => {
        test("does not show Friday question", async ({ page }) => {
            await selectSaturdayNo(page);
            await expect(page.getByText("Kom je ook vrijdagavond 19 juni")).not.toBeVisible();
        });

        test("does not show camping options", async ({ page }) => {
            await selectSaturdayNo(page);
            await expect(page.getByText("Wil je kamperen?")).not.toBeVisible();
        });

        test("does not show dietary field", async ({ page }) => {
            await selectSaturdayNo(page);
            await expect(page.locator('input#dietary')).not.toBeVisible();
        });

        test("Saturday No radio is checked", async ({ page }) => {
            await selectSaturdayNo(page);
            await expect(page.locator('input[name="attendingSaturday"][value="no"]')).toBeChecked();
        });
    });

    test.describe("Attending Friday - Yes Flow", () => {
        test("shows both camping night options", async ({ page }) => {
            await selectSaturdayYes(page);
            await selectFridayYes(page);
            await expect(page.locator('input#campingFriSat')).toBeVisible();
            await expect(page.locator('input#campingSatSun')).toBeVisible();
        });

        test("can select Friday camping checkbox", async ({ page }) => {
            await selectSaturdayYes(page);
            await selectFridayYes(page);
            await page.locator('input#campingFriSat').waitFor({ state: "visible" });
            await page.locator('input#campingFriSat').check({ force: true });
            await expect(page.locator('input#campingFriSat')).toBeChecked();
        });

        test("can select Saturday camping checkbox", async ({ page }) => {
            await selectSaturdayYes(page);
            await selectFridayYes(page);
            await page.locator('input#campingSatSun').waitFor({ state: "visible" });
            await page.locator('input#campingSatSun').check({ force: true });
            await expect(page.locator('input#campingSatSun')).toBeChecked();
        });

        test("can select both camping checkboxes", async ({ page }) => {
            await selectSaturdayYes(page);
            await selectFridayYes(page);
            await page.locator('input#campingFriSat').waitFor({ state: "visible" });
            await page.locator('input#campingFriSat').check({ force: true });
            await page.locator('input#campingSatSun').check({ force: true });
            await expect(page.locator('input#campingFriSat')).toBeChecked();
            await expect(page.locator('input#campingSatSun')).toBeChecked();
        });
    });

    test.describe("Attending Friday - No Flow", () => {
        test("shows only Saturday camping option", async ({ page }) => {
            await selectSaturdayYes(page);
            await selectFridayNo(page);
            await expect(page.locator('input#campingSatSun')).toBeVisible();
            await expect(page.locator('input#campingFriSat')).not.toBeVisible();
        });
    });

    test.describe("Switching Attendance Choices", () => {
        test("hides Friday options when switching Saturday from Yes to No", async ({ page }) => {
            await selectSaturdayYes(page);
            // Friday radio buttons should exist
            await expect(page.locator('input[name="attendingFriday"]')).toHaveCount(2);

            await selectSaturdayNo(page);
            // Friday radio buttons should be hidden
            await expect(page.locator('input[name="attendingFriday"]')).toHaveCount(0);
        });

        test("resets form state when switching Saturday attendance", async ({ page }) => {
            await selectSaturdayYes(page);
            await selectFridayYes(page);

            // Wait for camping checkboxes to be visible
            await page.locator('input#campingFriSat').waitFor({ state: "visible", timeout: 5000 });

            // Verify camping options appear for Friday attendees
            await expect(page.locator('input#campingFriSat')).toBeVisible();
            await expect(page.locator('input#campingSatSun')).toBeVisible();

            // Switch to No - all conditional fields should disappear
            await selectSaturdayNo(page);
            await expect(page.locator('input#campingFriSat')).not.toBeVisible();
            await expect(page.locator('input#campingSatSun')).not.toBeVisible();
            await expect(page.locator('input[name="attendingFriday"]')).toHaveCount(0);
        });

        test("hides Friday camping when switching Friday from Yes to No", async ({ page }) => {
            await selectSaturdayYes(page);
            await selectFridayYes(page);
            await page.locator('input#campingFriSat').waitFor({ state: "visible" });
            await expect(page.locator('input#campingFriSat')).toBeVisible();

            await selectFridayNo(page);
            await expect(page.locator('input#campingFriSat')).not.toBeVisible();
        });

        test("resets Friday camping checkbox when switching Friday to No", async ({ page }) => {
            await selectSaturdayYes(page);
            await selectFridayYes(page);
            await page.locator('input#campingFriSat').waitFor({ state: "visible" });
            await page.locator('input#campingFriSat').check({ force: true });

            // Switch Friday to No and back to Yes
            await selectFridayNo(page);
            await selectFridayYes(page);

            // Friday camping should be reset
            await page.locator('input#campingFriSat').waitFor({ state: "visible" });
            await expect(page.locator('input#campingFriSat')).not.toBeChecked();
        });
    });

    test.describe("Dietary Field", () => {
        test("can enter dietary requirements", async ({ page }) => {
            await selectSaturdayYes(page);
            await page.locator('input#dietary').fill("Vegetarisch, glutenvrij");
            await expect(page.locator('input#dietary')).toHaveValue("Vegetarisch, glutenvrij");
        });

        test("dietary field is optional", async ({ page }) => {
            await selectSaturdayYes(page);
            await expect(page.locator('input#dietary')).not.toHaveAttribute("required");
        });
    });

    test.describe("Form Submission", () => {
        test("shows loading state during submission", async ({ page }) => {
            await page.route("**/macros/**", (route) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
                        resolve(undefined);
                    }, 500);
                });
            });

            await page.locator('input#name').fill("Test Persoon");
            await page.locator('input#email').fill("test@example.com");
            await selectSaturdayNo(page);

            await page.getByRole("button", { name: "Versturen" }).click();
            await expect(page.getByText("Versturen...")).toBeVisible();
        });

        test("shows success message after submission", async ({ page }) => {
            await page.route("**/macros/**", (route) => {
                route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
            });

            await page.locator('input#name').fill("Test Persoon");
            await page.locator('input#email').fill("test@example.com");
            await selectSaturdayNo(page);

            await page.getByRole("button", { name: "Versturen" }).click();
            await expect(page.getByText("Bedankt!")).toBeVisible();
        });

        test("button is disabled during submission", async ({ page }) => {
            await page.route("**/macros/**", (route) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        route.fulfill({ status: 200 });
                        resolve(undefined);
                    }, 1000);
                });
            });

            await page.locator('input#name').fill("Test Persoon");
            await page.locator('input#email').fill("test@example.com");
            await selectSaturdayNo(page);

            const button = page.getByRole("button", { name: "Versturen" });
            await button.click();
            // Small wait to ensure submission started
            await page.waitForTimeout(100);
            await expect(button).toBeDisabled();
        });
    });

    test.describe("Error Handling", () => {
        // Note: These tests require NEXT_PUBLIC_RSVP_ENDPOINT to be unset.
        // In dev mode, Next.js may cache env vars. Test manually if these fail.
        test.skip("shows error when endpoint not configured", async ({ page }) => {
            await page.locator('input#name').fill("Test Persoon");
            await page.locator('input#email').fill("test@example.com");
            await selectSaturdayNo(page);

            await page.getByRole("button", { name: "Versturen" }).click();
            await expect(page.getByText(/niet geconfigureerd|misgegaan/)).toBeVisible({ timeout: 10000 });
        });

        test.skip("error message container appears after failed submission", async ({ page }) => {
            await page.locator('input#name').fill("Test Persoon");
            await page.locator('input#email').fill("test@example.com");
            await selectSaturdayNo(page);

            await page.getByRole("button", { name: "Versturen" }).click();
            await expect(page.locator(".bg-burnt-sienna\\/10")).toBeVisible({ timeout: 10000 });
        });
    });

    test.describe("Complete User Journeys", () => {
        test("guest attending both days with camping", async ({ page }) => {
            await page.route("**/macros/**", (route) => {
                route.fulfill({ status: 200 });
            });

            await page.locator('input#name').fill("Jan & Marie de Vries");
            await page.locator('input#email').fill("jan.marie@example.com");
            await selectSaturdayYes(page);
            await selectFridayYes(page);
            await page.locator('input#campingFriSat').waitFor({ state: "visible" });
            await page.locator('input#campingFriSat').check({ force: true });
            await page.locator('input#campingSatSun').check({ force: true });
            await page.locator('input#dietary').fill("Marie is vegetarisch");

            await page.getByRole("button", { name: "Versturen" }).click();
            await expect(page.getByText("Bedankt!")).toBeVisible();
        });

        test("guest attending Saturday only with camping", async ({ page }) => {
            await page.route("**/macros/**", (route) => {
                route.fulfill({ status: 200 });
            });

            await page.locator('input#name').fill("Piet Jansen");
            await page.locator('input#email').fill("piet@example.com");
            await selectSaturdayYes(page);
            await selectFridayNo(page);
            await page.locator('input#campingSatSun').check({ force: true });

            await page.getByRole("button", { name: "Versturen" }).click();
            await expect(page.getByText("Bedankt!")).toBeVisible();
        });

        test("guest attending Saturday only without camping", async ({ page }) => {
            await page.route("**/macros/**", (route) => {
                route.fulfill({ status: 200 });
            });

            await page.locator('input#name').fill("Klaas Bakker");
            await page.locator('input#email').fill("klaas@example.com");
            await selectSaturdayYes(page);
            await selectFridayNo(page);
            // No camping selected

            await page.getByRole("button", { name: "Versturen" }).click();
            await expect(page.getByText("Bedankt!")).toBeVisible();
        });

        test("guest not attending", async ({ page }) => {
            await page.route("**/macros/**", (route) => {
                route.fulfill({ status: 200 });
            });

            await page.locator('input#name').fill("Anna Smit");
            await page.locator('input#email').fill("anna@example.com");
            await selectSaturdayNo(page);

            await page.getByRole("button", { name: "Versturen" }).click();
            await expect(page.getByText("Bedankt!")).toBeVisible();
        });

        test("couple with dietary requirements", async ({ page }) => {
            await page.route("**/macros/**", (route) => {
                route.fulfill({ status: 200 });
            });

            await page.locator('input#name').fill("Tom & Lisa van Dam");
            await page.locator('input#email').fill("tom.lisa@example.com");
            await selectSaturdayYes(page);
            await selectFridayNo(page);
            await page.locator('input#dietary').fill("Tom: glutenvrij, Lisa: lactose-intolerant");

            await page.getByRole("button", { name: "Versturen" }).click();
            await expect(page.getByText("Bedankt!")).toBeVisible();
        });
    });

    test.describe("Accessibility", () => {
        test("form fields have proper labels", async ({ page }) => {
            // Inputs should have associated labels via htmlFor
            await expect(page.locator('label[for="name"]')).toBeVisible();
            await expect(page.locator('label[for="email"]')).toBeVisible();
        });

        test("submit button is focusable", async ({ page }) => {
            const submitButton = page.getByRole("button", { name: "Versturen" });
            await submitButton.focus();
            await expect(submitButton).toBeFocused();
        });
    });
});
