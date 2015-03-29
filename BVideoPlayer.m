//
//  BVideoPlayer.m
//  FacebookLogin
//
//  Created by Brent Vatne on 2015-03-29.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "BVideoPlayer.h"

#import "RCTEventDispatcher.h"
#import "RCTLog.h"
#import "RCTUtils.h"
#import "RCTView.h"
#import "RCTViewControllerProtocol.h"
#import "RCTWrapperViewController.h"
#import "UIView+React.h"

@import MediaPlayer;

@implementation BVideoPlayer
{
    MPMoviePlayerController *_player;
    RCTEventDispatcher *_eventDispatcher;
}

- (id)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
    if ((self = [super initWithFrame:CGRectZero])) {
        _eventDispatcher = eventDispatcher;

        NSURL *videoURL = [[NSURL alloc] initFileURLWithPath:[[NSBundle mainBundle] pathForResource:@"background" ofType:@"mp4"]];
        _player = [[MPMoviePlayerController alloc] initWithContentURL: videoURL];
        [self addSubview: _player.view];
        [_player setControlStyle:MPMovieControlStyleNone];
        [_player.view setFrame: self.bounds];
        [_player prepareToPlay];
        [_player play];

    }
    return self;
}

- (NSArray *)reactSubviews
{
    NSArray *subviews = @[_player.view];
    return subviews;
}

- (void)insertReactSubview:(UIView *)view atIndex:(NSInteger)atIndex
{
    RCTLogError(@"video cannot have any subviews");
    return;
}

- (void)removeReactSubview:(UIView *)subview
{
    RCTLogError(@"video cannot have any subviews");
    return;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    _player.view.frame = self.bounds;
}


@end
