# Requirements

Requires [Jekyll](https://github.com/mojombo/jekyll)

# Usage

* update DOWNLOAD\_VERSION in index.html
* run jekyll
* output will be in \_site/

## Advanced Usage

### Alerts

You can easily put alerts on the homepage by changing the ALERT and ALERT\_CLASS variables in index.html.

Example:

```
ALERT_CLASS: error
ALERT: <strong>Security alert:</strong> Please upgrade to 0.3.25 as soon as possible!
```


will produce a red alert box. Possible classes are: error (red), info (blue), success (green) and warning (yellow)
