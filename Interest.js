class Interest {
  constructor(amount, principal, tax, taxPercentage, time) {
    this.amount = amount;
    this.principal = principal;
    this.tax = tax;
    this.taxPercentage = taxPercentage;
    this.time = time;
    this.error = {
      status: false,
      messages: []
    }
  }

  handleError() {
    if (this.principal === this.amount) {
      this.tax = 0;
      this.taxPercentage = 0;
      this.error = {
        status: true,
        messages: [...this.error.messages, "Value equal to zero"]
      };
    }

    if (this.time === 0) {
      this.amount = this.principal;
      this.tax = 0;
      this.error = {
        status: true,
        messages: [...this.error.messages, "Value equal to zero"]
      };
    }

    if (this.tax === 0 && this.taxPercentage === 0) {
      this.time = 0;
      this.error = {
        status: true,
        messages: [...this.error.messages, "Value equal to zero"]
      };
    }

    if (this.principal === 0 || this.amount === 0) {
      this.principal = 0;
      this.amount = 0;
      this.tax = 0;
      this.error = {
        status: true,
        messages: [...this.error.messages, "Value equal to zero"]
      };
    }

    if (this.principal > this.amount) {
      this.error = {
        status: true,
        messages: [...this.error.messages, "Principal can't be higher than amount"]
      };
    }
  }
}

module.exports = Interest;
