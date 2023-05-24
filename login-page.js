import Common from "./common.js";
class Login extends Common {
  constructor() {
    super();
    this.$loginButton = () => $('//button[text()="Login "]');
    this.$loginHeader = () => $('//div[contains(text(),"Login")]');
    this.$signupButton = () => $("div.sgn_up_btn a");
    this.$registerHeader = () => $('//div[contains(text(),"Register")]');
    this.$registerFields = (fieldName) =>
      $(
        `//div[@class="modal-inner-wrap user-register-popup"]//input[@id="${fieldName}"]`
      );
    this.$verificationHeader = () =>
      $(".pop_header", "Verification Message Sent");
    this.$verifiationPopUp = () => $(".Register_popup");
    this.$verificationLogin = () =>
      $('//div[@class="subm_btn"]/a[@class="ng-binding"]		');
    this.$continueButton = () => $(".subm_btn");
    this.$Username = () => $('//span[@class="user-name ng-binding"]');
    this.$registretionPopUp = () => $('//div[@id="toast-container"]');
    /*********************** ****************************/
    this.$searchOption = () => $('//input[@ng-model="search.name"]');
    this.$clickOnButton = () => $('//span[text()="Tamil Nadu, India"]');
    this.$haveLocation = () => $('//li[text()="Chennai, Tamil Nadu, India"]');
    this.$selectMaxFasion = () => $('//h3[text()="MAX FASHIONS"]');
    this.$selectProduct = () =>
      $(
        '(//h2[text()="White shirt"])[1]/ancestor::div[@class="inner_res_menu_food"]//span[text()="Add"]'
      );
    this.$cartPopUp = () => $('//div[@class="modal-body"]');
    this.$cartHeader = () =>
      $(
        '//div[@class="modal-inner-wrap restaurant-detail-popup new_wrapper_overflow"]//h2[text()="White shirt"]'
      );
    this.$incrementingProduct = () =>
      $('//button[@class="btn btn-default btn-number"]');
    this.$checkingQuantity = () => $('//input[@name="addons_quantity"]');
    this.$addToCart = () => $('//button[text()="ADD TO CART"]');
  }
  /**
   * open url and launch the application.
   * @param {string} url
   */
  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url);
    await this.$loginButton().waitForDisplayed({
      timeout: 100000,
      timeoutMsg: "time out fail for login",
    });
  }
  /**
   * click on login button and navigate to login pop-up page.
   */
  async openLoginPopUp() {
    await this.$loginButton().click();
  }
  /**
   * click on sign-up button and navigate to register pop-up page.
   */
  async clickSignup() {
    await this.$signupButton().click();
    await this.$registerHeader().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "time out fail for register pop-up",
    });
  }
  /**
   * 
   * @param {string} firstName 
   * @param {string} lastName 
   * @param {string} email 
   * @param {string} phoneNumber 
   */
  async fillRegistrationForm(firstName, lastName, email, phoneNumber) {
    await this.$registerFields("first_name").setValue(firstName);
    await this.$registerFields("last_name").setValue(lastName);
    await this.$registerFields("email").setValue(email);
    await this.$registerFields("tel").setValue(phoneNumber);
    await this.$continueButton().click();
  }
  async verificationMessageSent() {
    await this.$verificationLogin().click();
    await this.$verificationHeader().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "time out fail for verification pop-up",
    });
  }/**
   * 
   * @param {string} Location 
   */
  async locationSearch(Location) {
    await this.$searchOption().setValue(Location);
    await this.$clickOnButton().click();
    await this.$selectMaxFasion().waitForDisplayed({
      timeout: 10000,
      interval: true,
      timeoutMsg: "time out fail for verification pop-up",
    });
  }

  async purchasingOption() {
    await this.$selectMaxFasion().click();
  }

  async addToCartPopUp(count) {
    await this.$selectProduct().click();
    await this.$cartPopUp().waitForDisplayed({
      timeout: 10000,
      interval: true,
      timeoutMsg: "time out fail for verification pop-up",
    });
    for (let i = 0; i < count; i++) {
      await this.$incrementingProduct().click();
    }
  }
  async addToCart() {
    await this.$addToCart().click();
  }
}
export default new Login();
