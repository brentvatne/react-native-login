//
//  BVideoPlayer.h
//  FacebookLogin
//
//  Created by Brent Vatne on 2015-03-29.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@class RCTEventDispatcher;

@interface BVideoPlayer : UIView

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@end