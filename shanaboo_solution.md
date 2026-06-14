Looking at the issue, I need to add documentation about p2pool and sharechain concepts to the developer guide. Based on the repository structure, this would likely go in the developer documentation section.

Let me examine the structure - I can see there's a reference to "Improving Developer Documentation" pointing to `docs/` directory, and there's an `en/` directory which likely contains English content.

Since this is for the developer guide, I should create a new file explaining p2pool and sharechain details. Looking at the structure, the most appropriate location would be in the `en/` directory for English content.

```diff
--- /dev/null
+++ b/en/p2pool-guide.md
@@ -0,0 +1,117 @@
+---
+layout: doc
+title: P2Pool and Sharechain Mining
+permalink: /en/p2pool-guide/
+---
+
+<h1>P2Pool and Sharechain Mining</h1>
+
+<p class="summary">P2Pool is a decentralized Bitcoin mining pool that operates without a central operator, using a novel "sharechain" system to distribute rewards fairly among participants.</p>
+
+<h2>What is P2Pool?</h2>
+
+<p>P2Pool (Peer-to-Peer Pool) is a decentralized mining pool for Bitcoin that eliminates the need for a central pool operator. Unlike traditional mining pools where a central authority collects and distributes rewards, P2Pool uses a peer-to-peer network to coordinate mining efforts and distribute rewards directly between participants.</p>
+
+<h2>Key Benefits of P2Pool</h2>
+
+<ul>
+  <li><strong>Decentralization</strong>: No central point of failure or control</li>
+  <li><strong>Reduced Orphan Rates</strong>: Built-in relay network provides lower orphan rates than other pools</li>
+  <li><strong>Address Privacy</strong>: Enhanced privacy compared to other mining pools</li>
+  <li><strong>Transparent Merged Mining</strong>: Supports transparent merged mining operations</li>
+  <li><strong>Censorship Resistance</strong>: No central authority can prevent participation</li>
+</ul>
+
+<h2>Understanding the Sharechain</h2>
+
+<p>The core innovation of P2Pool is the "sharechain" - a separate blockchain that runs parallel to the Bitcoin blockchain. The sharechain is used to track mining contributions and distribute rewards fairly among participants.</p>
+
+<h3>How Sharechain Works</h3>
+
+<ol>
+  <li><strong>Share Creation</strong>: Miners working on P2Pool create "shares" which are easier proof-of-work solutions than actual Bitcoin blocks</li>
+  <li><strong>Sharechain Formation</strong>: These shares form their own blockchain (the sharechain) with a much faster block time (typically 30 seconds)</li>
+  <li><strong>Reward Distribution</strong>: When a sharechain successfully mines a Bitcoin block, rewards are distributed based on share contributions recorded in the sharechain</li>
+  <li><strong>Sharechain Window</strong>: The sharechain maintains a rolling window of recent shares to determine reward distribution weights</li>
+</ol>
+
+<h3>Sharechain Technical Details</h3>
+
+<ul>
+  <li><strong>Block Time</strong>: Sharechain blocks are generated approximately every 30 seconds</li>
+  <li><strong>Difficulty Adjustment</strong>: Share difficulty adjusts dynamically based on network hashrate</li>
+  <li><strong>Window Size</strong>: The sharechain maintains a window of recent shares to calculate reward distribution</li>
+  <li><strong>Orphan Rate Reduction</strong>: The built-in relay network significantly reduces orphan rates compared to traditional pools</li>
+</ul>
+
+<h2>Technical Architecture</h2>
+
+<p>P2Pool operates as a peer-to-peer network where each participant runs a P2Pool node:</p>
+
+<ul>
+  <li><strong>P2P Network</strong>: All P2Pool nodes communicate directly with each other</li>
+  <li><strong>Share Propagation</strong>: Shares are propagated through the P2Pool network</li>
+  <li><strong>Block Broadcasting</strong>: Successfully mined blocks are broadcast to the Bitcoin network</li>
+  <li><strong>Reward Tracking</strong>: The sharechain tracks contributions for fair reward distribution</li>
+</ul>
+
+<h2>Getting Started with P2Pool</h2>
+
+<h3>Requirements</h3>
+
+<ul>
+  <li>Bitcoin Core node (fully synchronized)</li>
+  <li>P2Pool software</li>
+  <li>Compatible ASIC miner or mining software</li>
+</ul>
+
+<h3>Setup Process</h3>
+
+<ol>
+  <li><strong>Install Bitcoin Core</strong>: Ensure you have a fully synchronized Bitcoin node</li>
+  <li><strong>Install P2Pool</strong>: Download and install P2Pool software from the official repository</li>
+  <li><strong>Configure Network</strong>: Connect to the P2Pool network by specifying your Bitcoin node</li>
+  <li><strong>Configure Miner</strong>: Point your mining hardware to your local P2Pool instance</li>
+  <li><strong>Start Mining</strong>: Begin mining and contribute to the sharechain</li>
+</ol>
+
+<h2>Advanced Concepts</h2>
+
+<h3>Sharechain-Linked Transactions</h3>
+
+<p>Sharechain-linked transactions represent a natural fit for advanced blockchain structures like braided chains or treechain architectures. These concepts aim to reduce the perception of orphan rates by creating more sophisticated linking mechanisms between shares.</p>
+
+<h3>Merged Mining</h3>
+
+<p>P2Pool supports transparent merged mining, allowing miners to simultaneously mine on multiple blockchains without requiring trust in a central pool operator for the auxiliary chains.</p>
+
+<h3>Braided Chains and Treechain Structures</h3>
+
+<p>The sharechain architecture is particularly well-suited for more advanced blockchain structures that can further reduce orphan rates and improve overall network efficiency. These structures take advantage of the sharechain's ability to maintain lower orphan rates through its built-in relay network.</p>
+
+<h2>Comparison with Traditional Mining Pools</h2>
+
+<table>
+  <thead>
+    <tr>
+      <th>Feature</th>
+      <th>Traditional Pools</th>
+      <th>P2Pool</th>
+    </tr>
+  </thead>
+  <tbody>
+    <tr>
+      <td>Central Authority</td>
+      <td>Required</td>
+      <td>None</td>
+    </tr>
+   