// An example script for deploying Tanium action with filter

if (!args.packageName && !args.packageID) {
    return 'Missing parameter: packageName or packageID';
}

var packageName = args.packageName || '';
var packageID = args.packageID || '';
var packageParams = args.parameters || '';
var comment = args.comment || '';

// targetGroup is the properties of the systems on which the requested package should run
var targetGroup = '\
<target_group>\
  <and_flag>1</and_flag>\
  <deleted_flag>0</deleted_flag>\
  <filters>\
    <filter>\
     <sensor>\
       <name>IP Address</name>\
     </sensor>\
     <all_values_flag>0</all_values_flag>\
     <ignore_case_flag>1</ignore_case_flag>\
     <not_flag>0</not_flag>\
     <operator>RegexMatch</operator>\
     <value>172.*</value>\
     <value_type>String</value_type>\
  </filter>\
  </filters>\
  <not_flag>0</not_flag>\
  <sub_groups/>\
  <text>Online is \"True\"</text>\
</target_group>';

var taniumArgs = {
						'package-name': packageName,
						'package-id': packageID,
						'parameters': packageParams,
						'comment': comment,
						'target-group': targetGroup,
				};

var res = executeCommand('tn-deploy-package', taniumArgs);
return res
