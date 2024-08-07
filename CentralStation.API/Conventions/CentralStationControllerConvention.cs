﻿using CentralStation.Application;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CentralStation.API.Conventions;

public class CentralStationControllerConvention : IApplicationModelConvention
{
    private readonly string[] _controllerPostFixes = ["controller", "appservice", "applicationservice"];

    private readonly Dictionary<HttpMethod, string[]> _methodNameMapping = new()
    {
        { HttpMethod.Delete, ["Remove"] },
        { HttpMethod.Patch, ["Update"] },
        { HttpMethod.Put, ["Create"] },
    };

    /// <inheritdoc />
    public void Apply(ApplicationModel application)
    {
        var appServiceController = application.Controllers
            .Where(c => c.ControllerType.IsAssignableTo(typeof(IApplicationService)));

        foreach (var controller in appServiceController)
        {
            Console.WriteLine("Registering Controller " + controller.ControllerName);
            controller.ControllerName = TrimControllerName(controller.ControllerName);

            foreach (var action in controller.Actions)
            {
                foreach (var selector in action.Selectors)
                {
                    selector.AttributeRouteModel = new AttributeRouteModel
                    {
                        Template = $"api/{controller.ControllerName}/{action.ActionName}"
                    };

                    if (!selector.ActionConstraints.OfType<HttpMethodActionConstraint>().Any())
                    {
                        selector.ActionConstraints.Add(
                            new HttpMethodActionConstraint(new[] { GetHttpMethod(action) })
                        );
                    }
                }
            }
        }
    }

    private string TrimControllerName(string name)
    {
        foreach (var postFix in _controllerPostFixes)
        {
            if (name.EndsWith(postFix, StringComparison.OrdinalIgnoreCase))
            {
                name = name[..name.LastIndexOf(postFix, StringComparison.OrdinalIgnoreCase)];
            }
        }

        return name;
    }

    private string GetHttpMethod(ActionModel action)
    {
        var actionName = action.ActionName.ToLowerInvariant();

        var fixes = _methodNameMapping
            // Add Predefined Methods
            .Concat([
                new KeyValuePair<HttpMethod, string[]>(HttpMethod.Patch, [HttpMethod.Patch.Method]),
                new KeyValuePair<HttpMethod, string[]>(HttpMethod.Delete, [HttpMethod.Delete.Method]),
                new KeyValuePair<HttpMethod, string[]>(HttpMethod.Put, [HttpMethod.Put.Method]),
                new KeyValuePair<HttpMethod, string[]>(HttpMethod.Post, [HttpMethod.Post.Method]),
                new KeyValuePair<HttpMethod, string[]>(HttpMethod.Get, [HttpMethod.Get.Method]),
            ])
            // Change name to Lower
            .Select(pair =>
                new KeyValuePair<HttpMethod, string[]>(
                    pair.Key,
                    pair.Value.Select(name => name.ToLowerInvariant()).ToArray()
                )
            );


        foreach (var (method, fix) in fixes)
        {
            if (
                fix.Any(prefix => actionName.StartsWith(prefix)) ||
                fix.Any(postfix => actionName.EndsWith(postfix))
            )
            {
                return IsPostMethodPreferred(action)
                    ? HttpMethod.Post.Method
                    : method.Method;
            }
        }


        return HttpMethod.Post.Method;
    }

    private static bool IsPostMethodPreferred(ActionModel action)
    {
        var complexParam = action.Parameters
            .FirstOrDefault(param => !param.ParameterType.IsPrimitive);

        if (complexParam == null)
            return false;

        complexParam.BindingInfo ??= new BindingInfo();
        complexParam.BindingInfo.BindingSource = BindingSource.Body;

        return true;
    }
}