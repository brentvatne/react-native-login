//
//  BVideoPlayerManager.m
//  FacebookLogin
//
//  Created by Brent Vatne on 2015-03-29.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "BVideoPlayerManager.h"
#import "RCTBridge.h"
#import "BVideoPlayer.h"

@implementation BVideoPlayerManager

@synthesize bridge = _bridge;

- (UIView *)view
{
    return [[BVideoPlayer alloc] initWithEventDispatcher:_bridge.eventDispatcher];
}

@end