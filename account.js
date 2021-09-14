//	@ghasemkiani/litecoin/account

import litecore from "bitcore-lib-ltc";

import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base"

const {PrivateKey, PublicKey, Address} = litecore;

class Account extends Obj {
	get key() {
		return this._key;
	}
	set key(key) {
		if (!cutil.isNilOrEmptyString(key)) {
			this._key = new PrivateKey(key).toString();
		} else {
			this._key = key;
		}
	}
	get wif() {
		return cutil.isNilOrEmptyString(this.key) ? null : new PrivateKey(this.key).toWIF().toString();
	}
	set wif(wif) {
		if (cutil.isNilOrEmptyString(wif)) {
			this.key = null;
		} else {
			this.key = PrivateKey.fromWIF(wif).toString();
		}
	}
	get pub() {
		if (!this._pub && this.key) {
			this._pub = new PrivateKey(this.key).toPublicKey().toString();
		}
		return this._pub;
	}
	set pub(pub) {
		this._pub = pub;
	}
	get address() {
		if (cutil.isNilOrEmptyString(this._address)) {
			if (this.pub) {
				this._address = new PublicKey(this.pub).toAddress().toString();
			}
		}
		return this._address;
	}
	set address(address) {
		this._address = address;
	}
	get addressSw() {
		if (cutil.isNilOrEmptyString(this._addressSw)) {
			if (this.pub) {
				this._addressSw = Address.fromPublicKey(new PublicKey(this.pub), null /* default network */, Address.PayToWitnessPublicKeyHash).toString();
			}
		}
		return this._addressSw;
	}
	set addressSw(addressSw) {
		this._addressSw = addressSw;
	}
}
cutil.extend(Account.prototype, {
	_pub: null,
	_key: null,
	_address: null,
	_addressSw: null,
});

export {Account};
