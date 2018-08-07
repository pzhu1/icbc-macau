import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { sha256, sha224 } from 'js-sha256';
import  jsrsasign from 'jsrsasign'

@Injectable()
export class CardMerchantService {
    constructor(private http: HttpClient) {}

    private privateKey = `-----BEGIN PRIVATE KEY-----
            MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCEUh3NSfhxYPW85XlPlL5AM9byqdjirN1rthTJ7VtsqPLLruKcI64j9G2Pmu4GXPpAVAIHNgp9tPwiE4whv/8Q2VjRPQsCCzzZ5axy/G1rmWBeVlZ5423TPP9jFsJGVdGDZ7UKMGKvtMvR9nybBUL/2Ve1j3cELZStP3FL3vYyRoYoirCiyfxP0Jqq1PVxNODfDqA7CyEtrfMO2MxWnm7XxvA8Mk68cJ/V6816PsewWhY2DxK1To9XEmlEEqZT3taWb2Us/Ru6SKQxg5unaX8LOx4kw6t7qjA709O8YDXh+Q4y4DQT8qmbICLFnoSm+kyRuj+FsjjiW+MdfE07HB9jAgMBAAECggEADu7Fdjl21DTBBsRO4HBE2DIBe/k3BL3FbzZpOjCTNLwMSng+EqjkKiKXirFNU2KCy2evouiyXmViXuYd1mE4g8pDf7mH2H80KtMElyVto8r3WS4dLDxCVKh5mdEjs5RTxKSbhb7YJEQfDF7oyQXa/cylXVQHdm0+bh7OxmUvG5U2+0ib/EtsPo+yjQDRjPChZ3KNtCZA7Ei+d+sQl3OSCAsqWiKas79488971fCjNjRRi+7a9mfhNJZr6LulT9cPdEgj1GN8saEG2FdVw5dyqRv5mq4VcmyINAAe4VcksVu0l+nngNeYU7lvaXI4c4/+b3v3jS7qTaSlq+HV8y5u4QKBgQDt9P1t0EZmoyI+Ow+YaCnqnF9ztRA7o5j1Si9Q9vl8nir9J6NdxPUa4GeRD1SYXgdcOasqoxjHHGgN00KrP7yVzzyMWrVoRCw109FXbq0vQzj/ot0C7QSwGHQfjrd90u24zBJC4+QjULkHWamqv2z+F6v8ZGVoZVpR7/gnW4NpdwKBgQCOWpwZzxK6BOC4NPM90o4ibKMWsVFBG4njk9+ZeCUaQFoZ8M3ok/9w6HyiIagaURfke3n1dRsS+kwxGm7assnOTNHtBGx9+tQA8MvyJ/DYjcRGbbKYeqQGa1u6OD/6XEmR6ze9losXjTb0jhkPbJcRTGvj1Z6FAxCupmcl1pV0dQKBgDAMJNP0lxKIZBSutkJu3e/abUeeys1QBkWZGh6+D7hC86k0RL9dUqR/pUncD5fIfLH5jv9H+WvS54vLGY4ci4awVqh8dF6+TTL9NyrxVRTS/QJZL0k09JpeBayNk61bVtbWleVdwKYE2aeLSkAI8QgJXZfT6cn/lRIwYyoHR2yXAoGAPm9vV8KCrCPHjANtTAg1XtPXE/ThdnTlnXMV9vHDFCh1XDtJlGCVAKh3QYURfbljiUq+yvF51nEBSegWBsWzzU/UIuh1zSteIKt8R9FMyS4kj989HbNsjYQ4zwwsw1oGyoEoCXclukate8V3KFSwTV3/VAY1aJFXl8JUKzxagKECgYEAlkUie7XeH+XMD5Als5fRiOGBkUL7VEubXF5gwtZ46ztwmL4d670F+SPz9bSVOjzU6TC+MJzUW4b/etlNxWszb9VkhtaQe/hKedyenSjxy/Bk2f7QRggWUprWaJ695t9n67+4p4gZ1geeIp6NeJY/NMbGJHdX3CTNqTtPq+Kyi7I=
            -----END PRIVATE KEY-----`;
    private publicKey='MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhFIdzUn4cWD1vOV5T5S+QDPW8qnY4qzda7YUye1bbKjyy67inCOuI/Rtj5ruBlz6QFQCBzYKfbT8IhOMIb//ENlY0T0LAgs82eWscvxta5lgXlZWeeNt0zz/YxbCRlXRg2e1CjBir7TL0fZ8mwVC/9lXtY93BC2UrT9xS972MkaGKIqwosn8T9CaqtT1cTTg3w6gOwshLa3zDtjMVp5u18bwPDJOvHCf1evNej7HsFoWNg8StU6PVxJpRBKmU97Wlm9lLP0bukikMYObp2l/CzseJMOre6owO9PTvGA14fkOMuA0E/KpmyAixZ6EpvpMkbo/hbI44lvjHXxNOxwfYwIDAQAB';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        //headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
        //headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };


    private gwUrl = 'http://202.175.59.29:10443/gwinternet/cardmerchant-svc/';


    getSignInit(str:any) :any{

        let rsa = jsrsasign.KEYUTIL.getKey(this.privateKey);
        let sig = new jsrsasign.KJUR.crypto.Signature({"alg": "SHA256withRSA"});
        sig.init(rsa);

        sig.updateString(str);

        let sign = jsrsasign.hextob64(sig.sign());
        sign = encodeURIComponent(sign);
        return sign;
    }

    checkLoginSession(sessionid) {
        let str = "sessionId="+sessionid;

        let sign = this.getSignInit(str);
        let merCert = encodeURIComponent(this.publicKey);

        let url = this.gwUrl+'cardmerchant/getsessionContent'+'?'+str+'&'
            +'sign='+sign+'&merCert='+merCert;
        console.log(url);

        return this.http.get(url);
    }
	
	addUser(data) {
		let str = JSON.stringify(data);
		let sign = this.getSignInit(str);
		let merCert = encodeURIComponent(this.publicKey);
        let url = this.gwUrl + 'cardmerchant/addseconduser' + '?sign=' + sign + '&merCert=' + merCert;
        console.log(url);

        return this.http.post(url,data);
    }

    sendVerifyCode_rsa(mobile:any){

        let data= {
            "mobile":mobile
        };

        let str = JSON.stringify(data);
        console.log("str:" ,str);

        let sign = this.getSignInit(str);
        let merCert = encodeURIComponent(this.publicKey);

        let url = this.gwUrl+'cardmerchant/sendverifycode'
            +'?sign='+sign+'&merCert='+merCert;
        console.log(url);

        return this.http.post(url,data,this.httpOptions);
    }

    checkVerifyCode_rsa(mobile:any, verifycode: any){

        let data= {
            "mobile":mobile,
            "verifycode":verifycode
        };

        let str = JSON.stringify(data);
        console.log("str:" ,str);

        let sign = this.getSignInit(str);
        let merCert = encodeURIComponent(this.publicKey);

        let url = this.gwUrl+'cardmerchant/checkverifycode'
            +'?sign='+sign+'&merCert='+merCert;
        console.log(url);

        return this.http.post(url,data,this.httpOptions);
    }

    getSecondUsers(sessionid:any){

        let str = "sessionId="+sessionid;

        let sign = this.getSignInit(str);
        let merCert = encodeURIComponent(this.publicKey);

        let url = this.gwUrl+'cardmerchant/getseconduser'+'?'+str+'&'
            +'sign='+sign+'&merCert='+merCert;
        console.log(url);

        return this.http.get(url);
    }
}