//
//  RCTVideoPlayer.m
//  FacebookLogin
//
//  Created by Brent Vatne on 2015-03-29.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "RCTVideoPlayer.h"

#import "RCTEventDispatcher.h"
#import "RCTLog.h"
#import "RCTUtils.h"
#import "RCTView.h"
#import "RCTViewControllerProtocol.h"
#import "RCTWrapperViewController.h"
#import "UIView+React.h"

@import MediaPlayer;

@implementation RCTVideoPlayer
{
    MPMoviePlayerController *_player;
    RCTEventDispatcher *_eventDispatcher;
}

- (id)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
    if ((self = [super initWithFrame:CGRectZero])) {
        _eventDispatcher = eventDispatcher;
        _player = [[MPMoviePlayerController alloc] init];
        [self addSubview: _player.view];

    }
    return self;
}

- (void)initFromSource:(NSString *)source
{
    NSLog(@"got here!");
    NSURL *videoURL = [[NSURL alloc] initFileURLWithPath:[[NSBundle mainBundle] pathForResource:source ofType:@"mp4"]];
    [_player setContentURL:videoURL];
    [_player setControlStyle:MPMovieControlStyleNone];
    [_player setScalingMode:MPMovieScalingModeNone];
    [_player setRepeatMode:MPMovieRepeatModeOne];
    [_player.view setFrame: self.bounds];
    [_player prepareToPlay];
    [_player play];
}

- (void)setResizeMode:(NSInteger)mode
{
    [_player setScalingMode:mode];
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
