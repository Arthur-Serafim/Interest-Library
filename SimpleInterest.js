const Interest = require('./Interest')

class SimpleInterest extends Interest {
  // Tax = principal * TaxPercentage * Time
  // Amount = principal + Tax
  // AMOUNT principal TAX

  getAmount() {
    this.amount = this.principal + this.tax;
  }

  getprincipal() {
    if (this.amount && this.tax) {
      this.principal = this.amount - this.tax;
    } else {
      this.principal = this.tax / (this.taxPercentage * this.time);
    }
  }

  getTax() {
    this.tax = this.amount - this.principal;
  }

  getTaxPercentage() {
    this.taxPercentage = this.tax / (this.principal * this.time);
  }

  getTime() {
    this.time = this.tax / (this.principal * this.taxPercentage);
  }

  populateFields() {
    while (
      !this.amount ||
      !this.principal ||
      !this.tax ||
      !this.taxPercentage ||
      !this.time
    ) {
      this.handleError();
      if (this.error.status) {
        break;
      } else if (
        (!this.tax && this.time && this.taxPercentage && this.principal) ||
        (!this.tax && this.principal && this.amount)
      ) {
        // Populate tax field
        this.getTax();
      } else if (!this.time && this.tax && this.principal && this.taxPercentage) {
        // Populate time field
        this.getTime();
      } else if (!this.taxPercentage && this.tax && this.principal && this.time) {
        // Populate tax percentage field
        this.getTaxPercentage();
      } else if (
        (!this.principal && this.tax && this.taxPercentage && this.time) ||
        (!this.principal && this.amount && this.tax)
      ) {
        // Populate principal field
        this.getprincipal();
      } else if (!this.amount && this.principal && this.tax) {
        // Populate amount field
        this.getAmount();
      } else {
        this.error = {
          status: true,
          messages: [...this.error.messages, "Values missing"]
        };
        break;
      }
    }
    return {
      amount: this.amount,
      principal: this.principal,
      tax: this.tax,
      taxPercentage: this.taxPercentage,
      time: this.time,
      error: this.error
    };
  }
}

module.exports = SimpleInterest