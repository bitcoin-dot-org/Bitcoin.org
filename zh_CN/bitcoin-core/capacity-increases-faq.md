---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base-core
lang: zh_CN
id: bitcoin-core-capacity-increases-faq
columns: 1
title: 系统扩展常见问题解答 — Bitcoin Core
breadcrumbs:
  - bitcoin
  - bcc
  - Capacity increases FAQ

moved_url: "https://bitcoincore.org/zh_CN/2015/12/21/%E7%B3%BB%E7%BB%9F%E6%89%A9%E5%B1%95%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94/"
---
# 系统扩展常见问题解答

1. toc
{:toc}

## 路线图包括什么新技术，预期在什么时候可以使用？  {#roadmap-dates}

在[路线图][roadmap]提及到以下的技术，在充分的测试后，预计可以在以下时间完成。

| 2015年12月 | | 隔离见证测试网 |
| 2016年2月 | 0.12.0 | [libsecp256k1验证][libsecp256k1 verification] |
| 2016年2月 | | 隔离见证功能完成并作审核 |
| 2016年3月\* | 0.12.x | 完成OP_CHECKSEQUENCEVERIFY (BIP[68][BIP68] 及 [112][BIP112]) + [BIP113][] 并作为首个以 [BIP9][] versionbits 实施的软分叉 |
| 2016年4月\* |  0.12.x |  完成隔离见证 |
| 2016年 | | 弱区块, IBLTs, 或者二者都实现 |

\* 有星号的日期是预计完成代码的时间。代码只会在充分审核后才会发表，而软分叉完成也需要时间。([BIP66][]经历数月时间在2015年7月生效，[BIP65][]则只用了五周时间在2015年12月生效)

- **隔离见证测试网:** 一个独立的测试网，并非平常测试网的一部分。让 Bitcoin Core 开发员及钱包开发员测试隔离见证功能。

- **Libsecp256k1验证:** 在x86\_64硬件上提升交易验证速度五至七倍。帮助新节点加入网络并减轻现有节点的负担。

- **OP\_CHECKSEQUENCEVERIFY:** 让双向[支付通道][payment channel efficiency]可以无限期使用，提升效率达25倍。

- **VersionBits:** 允许1至29个软分叉同时实施，让系统升级的过程更快，更去中心化。

- **隔离见证:** 允许交易容量上升到1.75至4倍，解决第三方延展性让智能合约更安全，双向支付通道效率提升66%，提供欺诈证明让轻量节点也可以执行系统规则，更容易对脚本系统升级以允许更强大的合约功能。

- **IBLT及弱区块:** 只需要把[总带宽增加少许][increase in total bandwidth]，就可以把区块传播所必须的带宽减低90%以上，让矿工可以在最短时间內把区块传播出去，把[比特币广播网络][Bitcoin Relay Network]的好处带给所有全节点。IBLT及弱区块可以把全节点所需的带宽变得更平均，让将来可以更安全地增加最大区块容量。

## 隔离见证软分叉究竟相当于多少的区块大小增加？我听过不同讲法，如4MB、2MB、1.75MB。 {#segwit-size}

[现在的方案][current proposal]是以软分叉来实现隔离见证，并把每字节的见证内容算为0.25字节，因此最大的区块体积会是稍低于4MB。

然而，区块并不应该只有见证内容，而计算非见证内容的体积时不会有折扣，因此并不可能有4MB的体积。

根据Anthony Towns的[计算][calculations]，如果区块装满了标准的单签名P2PKH交易，体积大概为1.6MB；如果是2-of-2多重签名交易，则大概为2.0MB。

[current proposal]: https://youtu.be/fst1IK_mrng?t=2234
[calculations]: http://lists.linuxfoundation.org/pipermail/bitcoin-dev/2015-December/011869.html

## 隔离见证好像很复杂，比特币生态各环节准备好没有？ {#ecosystem-ready}

有些想法是容易解释但执行很难，有些却是解释很难但执行容易，隔离见证似乎是后者。

由于隔离见证可以逐步实行而不会破坏兼容性，因此生态内各环节无需特别准备。开发员可以在2015年12月推出的测试网得到实际的使用经验并同时测试他们的软件。

最初，只有希望支持隔离见证的矿工需要升级，让新规则可以在主网实行。现有的应用程序只有需要使用新功能才需要改变。

隔离见证交易收取较低交易费，有更佳的性能，而且支持多重签名智能合约，如双向支付通道，可以作大量交易却无需在区块链作额外纪录。我们强烈建议钱包升级，但即使不升级，现有钱包仍然可以继续正常使用。

## 我还是觉得隔离见证很复杂，为什么不简单地提高区块体积？  {#size-bump}

在Bitcoin Core有[一句代码][max_block_size]指定区块最大是 1,000,000 字节 (1MB)。最简单的方法是用硬分叉改变这句代码，例如变为 2,000,000 字节 (2MB)。

但硬分叉本身绝不简单:

- **我们并没有经验:** 矿工，商户，开发员，用户都没有硬分叉的经验，因此让硬分叉可以安全实行的技术也未经测试。

    软分叉则不同。软分叉最初由中本聪管理，然后我们又从实行[BIP16][]所遇到的问题中得到经验，让我们以改良了的方法实行[BIP34][]，以及后来的BIP[66][BIP66] 和 [65][BIP65]。在将来的软分叉，我们正准备使用[BIP9][] version bits，让多个软分叉方案可以同时进行。

- **强制升级:** 硬分叉要求所有全节点升级，任何使用旧版本节点的人都可能会损失金钱，这不但包括全节点钱包的运行者本身，还包括依靠该全节点提供数据的轻量钱包。

- **需要其它的改动:** 即使只是改一行代码来增加最大区块容量，也会影响到系统内其它代码，有些更是不良的影响。例如现在可以制造一个接近1MB的交易，而现代的电脑验证该交易需时超过30秒 (这样的交易已存在于区块链上)。在2MB的区块下，验证一个2MB的交易需时10分钟，将成为一个很危险的攻击方法。为了避免这种攻击，就有必要改动其它代码。

虽然有以上的问题，但只要有充足的准备，硬分叉并不会出现致命问题，而我们也预计将来会有硬分叉。但隔离见证可以用我们更熟悉的软分叉完成，而且带来增加交易量以外更多的好处。

和简单提升区块体积相比，隔离见证需要在不同的软件层面作更多改动。但如果我们真的希望比特币可以扩展，我们无论如何也需要根本性的改动，而隔离见证可以逐渐地鼓励人们升级至更具扩展性的方案，却无需强逼他们这样做。

开发员，矿工，以及社群已对软分叉有充分经验，我们相信实行隔离见证所需时间并不比提升容量的硬分叉为多，而且会更安全。

## 在实行隔离见证前会有硬分叉吗？隔离见证方案会本身又会否包括硬分叉？  {#pre-segwit-fork}

不会，这并非[路线图][roadmap]的一部分。

[roadmap]: https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2015-December/011865.html

## 如果最终还是要硬分叉，为何现在不做？ {#why-not-now}

利用有广泛共识的软分叉，我们能够把系统扩展而没有硬分叉的[副作用][q simple raise]，因此即使预期会有硬分叉，这并不是现在就要做的充分理由。

在路线图提到的改进，除提供额外的交易容量以外，配合其它技术如双向支付通道，可以让用户减少使用区块链，变相提高了比特币系统的容量，却不用增加全节点使用的带宽。例如：

- [BIP68][] 及 [BIP112][] 允许无限期的双向支付通道，可以大为减少纪录在区块链的交易。

- 隔离见证允许在关闭支付通道的同时开设新的支付通道，减少因为更换通道所需的区块链空间约66%。

- 隔离见证允许将来更容易以软分叉改变比特币的脚本语言，例如从签名提取公钥，或使用Schnorr联合签名算法，从而减少交易的平均大小。

- 实行隔离见证后，当无效区块出现时就可以产生很简洁的欺诈证明，这会让进行简单交易验证 (SPV) 的轻量节点的安全性更接近全节点，可以让整个网络在较少的全节点下仍能运作。

这些技术的实际效果仍然未知，但实行一个具广泛共识的软分叉可让我们立即得益并且测试和评估中期的可能性，以及用这些数据作长期的规划。

## 钱包会如何使用隔离见证？  {#segwit-in-wallets}

现在支持 P2SH 的钱包可以分两阶段转移至完整的隔离见证：

- 第一阶段：脚本需要经过两次哈希运算，首先是变成256字节，然后再变成160字节。这个160字节的哈希和现有的P2SH地址兼容，因此已升级的钱包和现有的钱包之间可以互相收付款项。

- 第二阶段：脚本只需一次哈希运算变为256字节。这格式和现有钱包不相容，但允许更有效率地使用区块空间，及提供更强的防碰撞攻击性能。

## 如果没有人被逼升级，为何会有人升级？听说P2SH用了差不多两年时间才得到广泛应用。  {#why-upgrade}

在隔离见证交易中，见证部分的每字节只算为0.25字节，也就是说这部分的交易费有75%的折扣，但只限于隔离见证的用户。

David Harding 提供了下表以[估计][estimated savings]在不同费用和交易类型下可以节省的费用。例如如果一个常见的250字节交易收费是0.01美元，用隔离见证花费一个P2PK-in-P2SH输出就可以节省约0.003美元。

| 交易 | 节省字节 | $0.01/250B | $0.05/250B | $0.25/250B | $1.00/250B |
|-------------|-------------|------------|------------|------------|------------|
| P2PK-in-P2SH |  79/107 | $0.003 | $0.015 | $0.079 | $0.316 |
| 1-of-1 P2SH 多签 | 83/112 | $0.003 | $0.016 | $0.083 | $0.332 |
| 2-of-2 P2SH 多签 | 163/219 | $0.006 | $0.032 | $0.163 | $0.652 |
| 2-of-3 P2SH 多签 | 189/254 | $0.007 | $0.037 | $0.189 | $0.756 |

(费用金额只作参考，我们并不预期交易费会达到上表显示的最高情况。)

收取固定比例费用 (如免费或1%交易额) 的网页钱包和交易所会最早应用隔离见证，因为即使每个交易节省很少，每天数以千计的交易加起来都会非常可观。

## 听说你们会让零确认不能再用，这是路线图内哪一项技术？  {#rbf}

这并不是路线图的一部分。作为现在 Bitcoin Core 版本的默认设置，在收到一个未确认交易后，就不会再接受其它有相同输入的交易。有些人认为这表示他们首个见到的交易就是安全的，但其实不是；如果真的是这样，我们根本不需要区块链。

在现时的默认设置下，人们并不能更新他们未确认的交易。在最初的 Bitcoin 版本，其实是有方法让使用者表明他希望交易可被更新，但为了防止拒绝服务攻击，中本聪在2010年关闭了这功能。

最近 Bitcoin Core 的开发员发现只要要求更新交易的同时要求使用者要付出更多的交易费，就可以防止上述的拒绝服务攻击，因此他们重开了中本聪那个允许交易被替换的机制。这功能会在预计2016年1至2月在 Bitcoin Core 0.12.0 推出，但和中本聪原本的设计一样，只有希望可以替换交易的使用者才需要选择使用支持该功能的钱包。

现在并没有钱包提供这功能，但将来这类钱包可以把多个未确认交易合并以减少所需要的区块链空间，也可以让用户提高未确认交易的费用，不会因为之前付费不足让交易「阻塞」在钱包内。

## 在路线图上弱区块和IBLT只注明是2016年，你们是否也不知道它们什么时候才可以完成？  {#weak-blocks-iblts}

弱区块和IBLT是两种仍在研究的技术，需要选择适当的参数，但因为参与的开发员有限，我们难以估计在什么时候才能推出。

弱区块和IBLT都只涉及网络改善而不是软分叉或硬分叉，因此只需要较短的测试时间就可以推出让节点升级，我们希望可以在2016年内完成。

在推出弱区块和IBLT后，我们可以利用一个简单而无争议的软分叉来[规范交易次序][canonical transaction ordering]让它们更有效率，这软分叉可以透过BIP9 versionBits 推出。

[canonical transaction ordering]: https://gist.github.com/gavinandresen/e20c3b5a1d4b97f79ac2#canonical-ordering-of-transactions

## 「如果隔离见证不能减少矿工所用的带宽，储存空间，和处理时间，为什么他们要支持？」 {#why-mine-segwit}

其实大部分[以前的软分叉][previous soft forks]都没有为矿工带来这些好处，例如：

| BIP16 (P2SH) | 新交易种类 |
| BIP30 (重覆交易ID) | 要求检查重覆交易ID |
| BIP34 (Coinbase 内记录区块高度) | 让矿工可用的coinbase空间减少 4 字节 |
| BIP65 (OP_CLTV) | 新脚本命令 |

在2015年7月正式执行的 BIP66 (严格 DER 签名) 软分叉让我们可以转用libsecp256k1作交易验证，让验证时间大减，让矿工得益。

而隔离见证可以为其使用者带来以下好处：

这永久地解决第三方延展性，让多阶段智能合约得以实现；减低交易费；让比特币脚本升级更容易，钱包更容易得到新功能。

通过以前的软分叉和沟通，例如在香港比特币扩展性会议内的矿工座谈会，矿工一再表达了即使他们未必有直接得益，他们也希望比特币成为一个最有用的系统。隔离见证和路线图上其它改进可以显着地提升比特币的可用性。

另外，隔离见证允许矿工在区块内加入更多交易，因此也可提升在每个区块内得到的收入。

## 我可以怎样帮忙？

首先阅读在 Bitcoin.org 上的 [Bitcoin Core贡献者][Bitcoin Core contributor]网页。
其中[代码审阅][code review]是实行软分叉极重要的一部分。

如果你想得到更多有关如何贡献的建议，请加入[#bitcoin-dev][] IRC 频道讨论。

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
