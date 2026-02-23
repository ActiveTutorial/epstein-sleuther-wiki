# Akamai

Performing a simple DNS lookup on the `www.justice.gov`:

```bash
$ dig www.justice.gov

; <<>> DiG 9.18.39-0ubuntu0.24.04.2-Ubuntu <<>> www.justice.gov
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 56948
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 65494
;; QUESTION SECTION:
;www.justice.gov.		IN	A

;; ANSWER SECTION:
www.justice.gov.	69	IN	CNAME	www.justice.gov.edgekey.net.
www.justice.gov.edgekey.net. 53	IN	CNAME	e7598.dscb.akamaiedge.net.
e7598.dscb.akamaiedge.net. 18	IN	A	23.63.128.170

;; Query time: 22 msec
;; SERVER: 127.0.0.53#53(127.0.0.53) (UDP)
;; WHEN: Mon Feb 23 13:42:32 CET 2026
;; MSG SIZE  rcvd: 137
```

This reveals that justice.gov uses [Akamai](https://www.akamai.com/) in some way.

Further investigation:

```bash
$ curl -I https://www.justice.gov/
HTTP/2 200 
content-language: en
content-type: text/html; charset=UTF-8
etag: "1771626635-gzip"
last-modified: Fri, 20 Feb 2026 22:30:35 GMT
server: nginx
x-age: 0
x-ah-environment: prod
x-cache-hits: 8
x-content-type-options: nosniff
x-drupal-dynamic-cache: UNCACHEABLE (poor cacheability)
x-frame-options: ALLOW-FROM http://doj365.sharepoint.us/
x-generator: Drupal 10 (https://www.drupal.org)
x-request-id: v-c6137108-0eab-11f1-a22d-ab52ac0b29de
x-xss-protection: 1; mode=block
cache-control: public, max-age=34740
expires: Mon, 23 Feb 2026 22:30:38 GMT
date: Mon, 23 Feb 2026 12:51:38 GMT
alt-svc: h3=":443"; ma=93600
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-queueit-connector: akamai

$ curl -I https://www.justice.gov/epstein/files/
HTTP/2 302 
server: AkamaiGHost
content-length: 0
location: https://www.justice.gov/age-verify?destination=/epstein/files/
expires: Mon, 23 Feb 2026 12:51:55 GMT
cache-control: max-age=0, no-cache, no-store
pragma: no-cache
date: Mon, 23 Feb 2026 12:51:55 GMT
alt-svc: h3=":443"; ma=93600
strict-transport-security: max-age=31536000; includeSubDomains; preload
set-cookie: QueueITAccepted-SDFrts345E-V3_usdojfiles=EventId%3Dusdojfiles%26RedirectType%3Dsafetynet%26IssueTime%3D1771851114%26Hash%3D6ec443e49f7672bdac4f433ebcc72c070adbe04fd5e9f90a1da5a721f655d0a1; expires=Tue, 24 Feb 2026 12:51:54 GMT; path=/
x-queueit-connector: akamai

$ curl -I https://www.justice.gov/epstein/files/DataSet%201/EFTA00000001.pdf -b "justiceGovAgeVerified=true"
HTTP/2 200 
x-amz-id-2: Jw2Xi9WWGxVz3QwYTr0RT95fFPCNPjbgGblduwnrR5m7heRKojf+sIfq3JDsnwTU3n8Xx2rCWpQ=
x-amz-request-id: 0Z8TGJV75PN8C441
last-modified: Fri, 19 Dec 2025 21:24:38 GMT
etag: "2b85b15404986b114a9256654783f930"
x-amz-server-side-encryption: AES256
x-amz-version-id: null
accept-ranges: bytes
content-type: application/pdf
content-length: 373984
server: AmazonS3
expires: Mon, 23 Feb 2026 12:53:23 GMT
cache-control: max-age=0, no-cache, no-store
pragma: no-cache
date: Mon, 23 Feb 2026 12:53:23 GMT
alt-svc: h3=":443"; ma=93600
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-queueit-connector: akamai
set-cookie: QueueITAccepted-SDFrts345E-V3_usdojfiles=EventId%3Dusdojfiles%26RedirectType%3Dsafetynet%26IssueTime%3D1771851203%26Hash%3Da211f04a24d928ced9fbf76350928d1269f55bba27889059ae3e3d06eab929f7; expires=Tue, 24 Feb 2026 12:53:23 GMT; path=/
```

This reveals the following:
- The main site is hosted on **Drupal 10 with Nginx**, delivered via **Akamai CDN**.
- Access to the Epstein files is gated by Queue-it / age verification, also routed through Akamai.
- The files themselves are stored on **Amazon S3**, not on the main server.
- The header `x-queueit-connector: akamai` confirms Akamai manages the Queue-it waiting room integration.