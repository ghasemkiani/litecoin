//	@ghasemkiani/litecoin/account

import litecore from "bitcore-lib-ltc";

import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base"

const {PrivateKey, PublicKey, Address} = litecore;

class Account extends Obj {
	static {
		cutil.extend(this.prototype, {
			_pub: null,
			_key: null,
			_address: null,
			_segwit: null,
		});
	}
	get segwit() {
		if (cutil.na(this._segwit) && cutil.a(this._address)) {
			this._segwit = this._address.startsWith("ltc");
		}
		return this._segwit;
	}
	set segwit(segwit) {
		this._segwit = segwit;
	}
	get key() {
		return this._key;
	}
	set key(key) {
		if (cutil.a(key)) {
			this._key = new PrivateKey(key).toString();
		} else {
			this._key = key;
		}
	}
	get wif() {
		return cutil.na(this.key) ? null : new PrivateKey(this.key).toWIF().toString();
	}
	set wif(wif) {
		if (cutil.na(wif)) {
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
		if (cutil.na(this._address)) {
			if (this.pub) {
				if (this.segwit) {
					this._address = Address.fromPublicKey(new PublicKey(this.pub), null /* default network */, Address.PayToWitnessPublicKeyHash).toString();
				} else {
					this._address = new PublicKey(this.pub).toAddress().toString();
				}
			}
		}
		return this._address;
	}
	set address(address) {
		this._address = address;
	}
}

export {Account};
