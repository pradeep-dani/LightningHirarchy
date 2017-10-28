({
    init: function(component, event, helper) {
        var action = component.get("c.getUserRoles");
        action.setCallback(this, function(response) {
            var roles = {}, results;
            if(component.isValid() && response.getState() === "SUCCESS") {
                results = response.getReturnValue();
                roles[undefined] = { Name: "Root", items: [] };
                results.forEach(function(v) {
                    roles[v.Id] = { Name: v.Name, items: [] };
                });
                results.forEach(function(v) {
                    roles[v.ParentRoleId].items.push(roles[v.Id]);
                });
                console.log(roles[undefined].items);
                console.log('--');
                console.log(roles);
                var obj = [{
                    Name: "Parent 1",
                    items: [{
                        Name: "Child 1",
                        items: [{
                            Name: "G 1",
                            items: [{
                                Name: "G 3"
                            }]
                        }, {
                            Name: "G 2",
                            items: [{
                                Name: "G 4"
                            }]
                        }]
                    }, {
                        Name: "Child 2"
                    }]
                }];
                
                
                component.set("v.nodes", roles[undefined].items);
                //component.set("v.nodes", obj);
            } else {
                alert(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})