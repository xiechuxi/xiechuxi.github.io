<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" />
  <xsl:template match="/">
    <html lang="en"><head><title>Chuxi’s notebook — RSS feed</title><meta name="viewport" content="width=device-width, initial-scale=1"/><style>body{font:16px/1.8 system-ui,sans-serif;background:#f8f9f3;color:#303a2e;max-width:740px;margin:60px auto;padding:0 24px}h1,h2{font-family:Georgia,serif;font-weight:400}h1{font-size:38px;line-height:1.2}a{color:#41603c;text-underline-offset:4px}article{border-top:1px solid #dce2d2;padding:20px 0}h2{margin:0}p{color:#626b5a}small{color:#626b5a}.intro{background:#edf0e4;padding:18px 24px;border-radius:8px;margin:26px 0}</style></head><body>
      <a href="/">← Back to the notebook</a><h1><xsl:value-of select="rss/channel/title" /></h1><div class="intro">This is an RSS feed. Copy this page’s address into your feed reader to follow new notes. <a href="/subscribe/">How to subscribe →</a></div>
      <xsl:for-each select="rss/channel/item"><article><h2><a href="{link}"><xsl:value-of select="title" /></a></h2><p><xsl:value-of select="description" /></p><small><xsl:value-of select="pubDate" /></small></article></xsl:for-each>
    </body></html>
  </xsl:template>
</xsl:stylesheet>