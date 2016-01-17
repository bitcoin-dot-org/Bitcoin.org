---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base-core
lang: zh_TW
id: bitcoin-core-capacity-increases-faq
columns: 1
title: 系統擴展常見問題解答 — Bitcoin Core
breadcrumbs:
  - bitcoin
  - bcc
  - Capacity increases FAQ

moved_url: "https://bitcoincore.org/zh_TW/2015/12/21/%E7%B3%BB%E7%B5%B1%E6%93%B4%E5%B1%95%E5%B8%B8%E8%A6%8B%E5%95%8F%E9%A1%8C%E8%A7%A3%E7%AD%94/"
---
# 系統擴展常見問題解答

1. toc
{:toc}

## 路線圖包括什麼新技術，預期在什麼時候可以使用？  {#roadmap-dates}

在[路線圖][roadmap]提及到以下的技術，在充分的測試後，預計可以在以下時間完成。

| 2015年12月 | | 隔離見證測試網 |
| 2016年2月 | 0.12.0 | [libsecp256k1驗證][libsecp256k1 verification] |
| 2016年2月 | | 隔離見證功能完成並作審核 |
| 2016年3月\* | 0.12.x | 完成OP_CHECKSEQUENCEVERIFY (BIP[68][BIP68] 及 [112][BIP112]) + [BIP113][] 並作為首個以 [BIP9][] versionbits 實施的軟分叉 |
| 2016年4月\* |  0.12.x |  完成隔離見證 |
| 2016年 | | 弱區塊, IBLTs, 或者二者都實現 |

\* 有星號的日期是預計完成代碼的時間。代碼只會在充分審核後才會發表，而軟分叉完成也需要時間。([BIP66][]經歷數月時間在2015年7月生效，[BIP65][]則只用了五周時間在2015年12月生效)

- **隔離見證測試網:** 一個獨立的測試網，並非平常測試網的一部分。讓 Bitcoin Core 開發員及錢包開發員測試隔離見證功能。

- **Libsecp256k1驗證:** 在x86\_64硬件上提升交易驗證速度五至七倍。幫助新節點加入網絡並減輕現有節點的負擔。

- **OP\_CHECKSEQUENCEVERIFY:** 讓雙向[支付通道][payment channel efficiency]可以無限期使用，提升效率達25倍。

- **VersionBits:** 允許1至29個軟分叉同時實施，讓系統升級的過程更快，更去中心化。

- **隔離見證:** 允許交易容量上升到1.75至4倍，解決第三方延展性讓智能合約更安全，雙向支付通道效率提升66%，提供欺詐證明讓輕量節點也可以執行系統規則，更容易對腳本系統升級以允許更強大的合約功能。

- **IBLT及弱區塊:** 只需要把[總帶寬增加少許][increase in total bandwidth]，就可以把區塊傳播所必須的帶寬減低90%以上，讓礦工可以在最短時間內把區塊傳播出去，把[比特幣廣播網絡][Bitcoin Relay Network]的好處帶給所有全節點。IBLT及弱區塊可以把全節點所需的帶寬變得更平均，讓將來可以更安全地增加最大區塊容量。

## 隔離見證軟分叉究竟相當於多少的區塊大小增加？我聽過不同講法，如4MB、2MB、1.75MB。 {#segwit-size}

[現在的方案][current proposal]是以軟分叉來實現隔離見證，並把每字節的見證內容算為0.25字節，因此最大的區塊體積會是稍低於4MB。

然而，區塊並不應該只有見證內容，而計算非見證內容的體積時不會有折扣，因此並不可能有4MB的體積。

根據Anthony Towns的[計算][calculations]，如果區塊裝滿了標準的單簽名P2PKH交易，體積大概為1.6MB；如果是2-of-2多重簽名交易，則大概為2.0MB。

[current proposal]: https://youtu.be/fst1IK_mrng?t=2234
[calculations]: http://lists.linuxfoundation.org/pipermail/bitcoin-dev/2015-December/011869.html

## 隔離見證好像很複雜，比特幣生態各環節準備好沒有？ {#ecosystem-ready}

有些想法是容易解釋但執行很難，有些卻是解釋很難但執行容易，隔離見證似乎是後者。

由於隔離見證可以逐步實行而不會破壞兼容性，因此生態內各環節無需特別準備。開發員可以在2015年12月推出的測試網得到實際的使用經驗並同時測試他們的軟件。

最初，只有希望支持隔離見證的礦工需要升級，讓新規則可以在主網實行。現有的應用程序只有需要使用新功能才需要改變。

隔離見證交易收取較低交易費，有更佳的性能，而且支持多重簽名智能合約，如雙向支付通道，可以作大量交易卻無需在區塊鏈作額外紀錄。我們強烈建議錢包升級，但即使不升級，現有錢包仍然可以繼續正常使用。

## 我還是覺得隔離見證很複雜，為什麼不簡單地提高區塊體積？  {#size-bump}

在Bitcoin Core有[一句代碼][max_block_size]指定區塊最大是 1,000,000 字節 (1MB)。最簡單的方法是用硬分叉改變這句代碼，例如變為 2,000,000 字節 (2MB)。

但硬分叉本身絕不簡單:

- **我們並沒有經驗:** 礦工，商戶，開發員，用戶都沒有硬分叉的經驗，因此讓硬分叉可以安全實行的技術也未經測試。

    軟分叉則不同。軟分叉最初由中本聰管理，然後我們又從實行[BIP16][]所遇到的問題中得到經驗，讓我們以改良了的方法實行[BIP34][]，以及後來的BIP[66][BIP66] 和 [65][BIP65]。在將來的軟分叉，我們正準備使用[BIP9][] version bits，讓多個軟分叉方案可以同時進行。

- **強制升級:** 硬分叉要求所有全節點升級，而任何使用舊版本節點的人都可能會損失金錢，這不但包括全節點錢包的運行者本身，還包括依靠該全節點提供數據的輕量錢包。

- **需要其它的改動:** 即使只是改一行代碼來增加最大區塊容量，也會影響到系統內其它代碼，有些更是不良的影響。例如現在可以制造一個接近1MB的交易，而現代的電腦驗證該交易需時超過30秒 (這樣的交易已存在於區塊鏈上)。在2MB的區塊下，驗證一個2MB的交易需時10分鐘，將成為一個很危險的攻擊方法。為了避免這種攻擊，就有必要改動其它代碼。

雖然有以上的問題，但只要有充足的準備，硬分叉並不會出現致命問題，而我們也預計將來會有硬分叉。但隔離見證可以用我們更熟悉的軟分叉完成，而且帶來增加交易量以外更多的好處。

和簡單提升區塊體積相比，隔離見證需要在不同的軟件層面作更多改動。但如果我們真的希望比特幣可以擴展，我們無論如何也需要根本性的改動，而隔離見證可以逐漸地鼓勵人們升級至更具擴展性的方案，卻無需強逼他們這樣做。

開發員，礦工，以及社群已對軟分叉有充分經驗，我們相信實行隔離見證所需時間並不比提升容量的硬分叉為多，而且會更安全。

## 在實行隔離見證前會有硬分叉嗎？隔離見證方案會本身又會否包括硬分叉？  {#pre-segwit-fork}

不會，這並非[路線圖][roadmap]的一部分。

[roadmap]: https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2015-December/011865.html

## 如果最終還是要硬分叉，為何現在不做？ {#why-not-now}

利用有廣泛共識的軟分叉，我們能夠把系統擴展而沒有硬分叉的[副作用][q simple raise]，因此即使預期會有硬分叉，這並不是現在就要做的充分理由。

在路線圖提到的改進，除提供額外的交易容量以外，配合其它技術如雙向支付通道，可以讓用戶減少使用區塊鏈，變相提高了比特幣系統的容量，卻不用增加全節點使用的帶寬。例如：

- [BIP68][] 及 [BIP112][] 允許無限期的雙向支付通道，可以大為減少紀錄在區塊鏈的交易。

- 隔離見證允許在關閉支付通道的同時開設新的支付通道，減少因為更換通道所需的區塊鏈空間約66%。

- 隔離見證允許將來更容易以軟分叉改變比特幣的腳本語言，例如從簽名提取公鑰，或使用Schnorr聯合簽名算法，從而減少交易的平均大小。

- 實行隔離見證後，當無效區塊出現時就可以產生很簡潔的欺詐證明，這會讓進行簡單交易驗證 (SPV) 的輕量節點的安全性更接近全節點，可以讓整個網絡在較少的全節點下仍能運作。

這些技術的實際效果仍然未知，但實行一個具廣泛共識的軟分叉可讓我們立即得益並且測試和評估中期的可能性，以及用這些數據作長期的規劃。

## 錢包會如何使用隔離見證？  {#segwit-in-wallets}

現在支持 P2SH 的錢包可以分兩階段轉移至完整的隔離見證：

- 第一階段：腳本需要經過兩次雜湊運算，首先是變成256字節，然後再變成160字節。這個160字節的雜湊和現有的P2SH地址兼容，因此已升級的錢包和現有的錢包之間可以互相收付款項。

- 第二階段：腳本只需一次雜湊運算變為256字節。這格式和現有錢包不相容，但允許更有效率地使用區塊空間，及提供更強的防碰撞攻擊性能。

## 如果沒有人被逼升級，為何會有人升級？聽說P2SH用了差不多兩年時間才得到廣泛應用。  {#why-upgrade}

在隔離見證交易中，見證部分的每字節只算為0.25字節，也就是說這部分的交易費有75%的折扣，但只限於隔離見證的用戶。

David Harding 提供了下表以[估計][estimated savings]在不同費用和交易類型下可以節省的費用。例如如果一個常見的250字節交易收費是0.01美元，用隔離見證花費一個P2PK-in-P2SH輸出就可以節省約0.003美元。

| 交易 | 節省字節 | $0.01/250B | $0.05/250B | $0.25/250B | $1.00/250B |
|-------------|-------------|------------|------------|------------|------------|
| P2PK-in-P2SH |  79/107 | $0.003 | $0.015 | $0.079 | $0.316 |
| 1-of-1 P2SH 多簽 | 83/112 | $0.003 | $0.016 | $0.083 | $0.332 |
| 2-of-2 P2SH 多簽 | 163/219 | $0.006 | $0.032 | $0.163 | $0.652 |
| 2-of-3 P2SH 多簽 | 189/254 | $0.007 | $0.037 | $0.189 | $0.756 |

(費用金額只作參考，我們並不預期交易費會達到上表顯示的最高情況。)

收取固定比例費用 (如免費或1%交易額) 的網頁錢包和交易所會最早應用隔離見證，因為即使每個交易節省很少，每天數以千計的交易加起來都會非常可觀。

## 聽說你們會讓零確認不能再用，這是路線圖內哪一項技術？  {#rbf}

這並不是路線圖的一部分。作為現在 Bitcoin Core 版本的默認設置，在收到一個未確認交易後，就不會再接受其它有相同輸入的交易。有些人認為這表示他們首個見到的交易就是安全的，但其實不是；如果真的是這樣，我們根本不需要區塊鏈。

在現時的默認設置下，人們並不能更新他們未確認的交易。在最初的 Bitcoin 版本，其實是有方法讓使用者表明他希望交易可被更新，但為了防止拒絕服務攻擊，中本聰在2010年關閉了這功能。

最近 Bitcoin Core 的開發員發現只要要求更新交易的同時要求使用者要付出更多的交易費，就可以防止上述的拒絕服務攻擊，因此他們重開了中本聰那個允許交易被替換的機制。這功能會在預計2016年1至2月在 Bitcoin Core 0.12.0 推出，但和中本聰原本的設計一樣，只有希望可以替換交易的使用者才需要選擇使用支持該功能的錢包。

現在並沒有錢包提供這功能，但將來這類錢包可以把多個未確認交易合並以減少所需要的區塊鏈空間，也可以讓用戶提高未確認交易的費用，不會因為之前付費不足讓交易「阻塞」在錢包內。

## 在路線圖上弱區塊和IBLT只注明是2016年，你們是否也不知道它們什麼時候才可以完成？  {#weak-blocks-iblts}

弱區塊和IBLT是兩種仍在研究的技術，需要選擇適當的參數，但因為參與的開發員有限，我們難以估計在什麼時候才能推出。

弱區塊和IBLT都只涉及網絡改善而不是軟分叉或硬分叉，因此只需要較短的測試時間就可以推出讓節點升級，我們希望可以在2016年內完成。

在推出弱區塊和IBLT後，我們可以利用一個簡單而無爭議的軟分叉來[規範交易次序][canonical transaction ordering]讓它們更有效率，這軟分叉可以透過BIP9 versionBits 推出。

[canonical transaction ordering]: https://gist.github.com/gavinandresen/e20c3b5a1d4b97f79ac2#canonical-ordering-of-transactions

## 「如果隔離見證不能減少礦工所用的帶寬，儲存空間，和處理時間，為什麼他們要支持？」 {#why-mine-segwit}

其實大部分[以前的軟分叉][previous soft forks]都沒有為礦工帶來這些好處，例如：

| BIP16 (P2SH) | 新交易種類 |
| BIP30 (重覆交易ID) | 要求檢查重覆交易ID |
| BIP34 (Coinbase 內記錄區塊高度) | 讓礦工可用的coinbase空間減少 4 字節 |
| BIP65 (OP_CLTV) | 新腳本命令 |

在2015年7月正式執行的 BIP66 (嚴格 DER 簽名) 軟分叉讓我們可以轉用libsecp256k1作交易驗證，讓驗證時間大減，讓礦工得益。

而隔離見證可以為其使用者帶來以下好處：

這永久地解決第三方延展性，讓多階段智能合約得以實現；減低交易費；讓比特幣腳本升級更容易，錢包更容易得到新功能。

通過以前的軟分叉和溝通，例如在香港比特幣擴展性會議內的礦工座談會，礦工一再表達了即使他們未必有直接得益，他們也希望比特幣成為一個最有用的系統。隔離見證和路線圖上其它改進可以顯著地提升比特幣的可用性。

另外，隔離見證允許礦工在區塊內加入更多交易，因此也可提升在每個區塊內得到的收入。

## 我可以怎樣幫忙？

首先閱讀在 Bitcoin.org 上的 [Bitcoin Core貢獻者][Bitcoin Core contributor]網頁。
其中[代碼審閱][code review]是實行軟分叉極重要的一部分。

如果你想得到更多有關如何貢獻的建議，請加入[#bitcoin-dev][] IRC 頻道討論。

[#bitcoin-dev]: https://webchat.freenode.net/?channels=bitcoin-dev&amp;uio=d4
[BIP9]: https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki
[BIP16]: https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki
[BIP34]: https://github.com/bitcoin/bips/blob/master/bip-0034.mediawiki
[BIP50]: https://github.com/bitcoin/bips/blob/master/bip-0050.mediawiki
[BIP65]: https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki
[BIP66]: https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki
[BIP68]: https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki
[BIP112]: https://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki
[BIP113]: https://github.com/bitcoin/bips/blob/master/bip-0113.mediawiki
[bitcoin core contributor]: /en/bitcoin-core/
[Bitcoin relay network]: http://bitcoinrelaynetwork.org/
[code review]: https://bitcoin.org/en/development#code-review
[estimated savings]: https://www.reddit.com/r/bitcoinxt/comments/3w1i6b/i_attended_scaling_bitcoin_hong_kong_these_are_my/cxtkaih
[increase in total bandwidth]: https://scalingbitcoin.org/hongkong2015/presentations/DAY1/3_block_propagation_1_rosenbaum.pdf
[libsecp256k1 verification]: https://github.com/bitcoin/bitcoin/pull/6954
[max_block_size]: https://github.com/bitcoin/bitcoin/blob/3038eb63e8a674b4818cb5d5e461f1ccf4b2932f/src/consensus/consensus.h#L10
[miners' panel]: https://youtu.be/H-ErmmDQRFs?t=1086
[payment channel efficiency]: https://scalingbitcoin.org/hongkong2015/presentations/DAY2/1_layer2_2_dryja.pdf
[previous soft forks]: https://github.com/bitcoin/bips/blob/master/bip-0123.mediawiki#classification-of-existing-bips
[q simple raise]: #size-bump
