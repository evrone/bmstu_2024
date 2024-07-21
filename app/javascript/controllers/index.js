// Import and register all your controllers from the importmap under controllers/*

import { application } from "./application"
import HelloController from "./hello_controller"
import VkidController from "./vkid_controller"

// Eager load all controllers defined in the import map under controllers/**/*_controller
// import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
// eagerLoadControllersFrom("controllers", application)

application.register("hello", HelloController)
application.register("vkid", VkidController)

// Lazy load controllers as they appear in the DOM (remember not to preload controllers in import map!)
// import { lazyLoadControllersFrom } from "@hotwired/stimulus-loading"
// lazyLoadControllersFrom("controllers", application)
