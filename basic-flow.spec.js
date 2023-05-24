import loginPage from "../pageobjects/login-page.js";
let count = 10;
let email = `${Math.random().toString(36).substring(2, 8)}@mailsac.com`;
let phoneNumber = Math.floor(Math.random() * 10000000000);

describe("Basic flow of EDelivery Application", () => {
  it("Open URL and load the application", async () => {
    await loginPage.openUrl("https://edelivery.zoproduct.com/");
    await expect(browser).toHaveUrl("https://edelivery.zoproduct.com/");
  });
  it("Click on login button and check if pop-up window appears", async () => {
    await loginPage.openLoginPopUp();
    expect(await loginPage.$loginHeader().isDisplayed()).toBe(true);
  });
  it("Click on sign-up button and check if register pop-up appears", async () => {
    await loginPage.clickSignup();
    expect(await loginPage.$registerHeader().isDisplayed()).toBe(true);
  });
  it("Enter the register form details", async () => {
    let firstName = await loginPage.getRandomLetters(6);
    await loginPage.fillRegistrationForm(
      firstName,
      "johnsina",
      email,
      phoneNumber
    );
    expect(await loginPage.$verificationHeader().isDisplayed()).toBe(true);
  });
  it("Click on login button on 'Verification Message Sent' pop up", async () => {
    await loginPage.verificationMessageSent();
    expect(await loginPage.$verificationHeader().isDisplayed()).toBe(true);
  });
  it("Checking the entered and displayed user name are same", async () => {
    const elem = await $('//div[@id="toast-container"]');
    await expect(elem).toBeDisplayed("Registered Successfully");
  });
  /**************************************** ********************************************/

  it("Entered the location", async () => {
    await loginPage.locationSearch("chennai");
    await expect(browser).toHaveUrl(
      "https://edelivery.zoproduct.com/chennai/5eba800fb38f74523bc5c41e/restaurants"
    );
  });
  it("Select the purchasing category", async () => {
    await loginPage.purchasingOption();
    await expect(browser).toHaveUrl(
      "https://edelivery.zoproduct.com/r/chennai/max-fashions/0"
    );
  });
  it("Incrementing the product ", async () => {
    await loginPage.addToCartPopUp(count);
    expect(await loginPage.$cartHeader()).toHaveText("White shirt");
    expect(await loginPage.$checkingQuantity()).toBeDisplayed(11);
  });
  it("Adding the proct to the cart ", async () => {
    await loginPage.addToCart();
  });
  it("checking the price ", async () => {
    const elem = await $(
      '(//span[text()="Item Total"])[1]/ancestor::div[@class="total-amount-detail"]//div[@class="amount-detail"]'
    );
    await expect(elem).toBeDisplayed("₹6,930.00");
  });
});
